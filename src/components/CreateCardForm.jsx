import { useState, useEffect } from 'react';

const PREFIX = '[3D att] ';

const DOCUMENT_TYPES = [
  { id: '3d-attachment', label: '3D Attachment Cards', enabled: true },
  { id: 'jira-task', label: 'Jira Tasks', enabled: false },
  { id: 'confluence-page', label: 'Confluence Page', enabled: false },
  { id: 'design-doc', label: 'Design Document', enabled: false },
];

export default function CreateCardForm() {
  const [documentType, setDocumentType] = useState(DOCUMENT_TYPES[0].id);
  const [folders, setFolders] = useState([]);
  const [foldersLoading, setFoldersLoading] = useState(true);
  const [folder, setFolder] = useState('');
  const [cardName, setCardName] = useState(PREFIX);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [tokenExpired, setTokenExpired] = useState(false);

  // Load folders from backend on mount
  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    setFoldersLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/confluence/folders');
      const result = await response.json();

      if (result.success && result.folders) {
        setFolders(result.folders);
        // Set default to first folder or one containing "2026"
        const defaultFolder = result.folders.find(f => f.includes('2026')) || result.folders[0];
        setFolder(defaultFolder || '');
        setTokenExpired(false);
      } else {
        console.error('Failed to load folders:', result.error);

        // Check if error is related to authentication/token
        if (result.error && (
          result.error.includes('401') ||
          result.error.includes('Unauthorized') ||
          result.error.includes('Failed to connect')
        )) {
          setTokenExpired(true);
        }

        // Fallback to hardcoded list
        setFolders(['Attachments 2025', 'Attachments 2026']);
        setFolder('Attachments 2026');
      }
    } catch (err) {
      console.error('Failed to fetch folders:', err);
      // Fallback to hardcoded list
      setFolders(['Attachments 2025', 'Attachments 2026']);
      setFolder('Attachments 2026');
    } finally {
      setFoldersLoading(false);
    }
  };

  // Handle card name change - ensure prefix is always present
  const handleCardNameChange = (e) => {
    const value = e.target.value;

    // If user tries to delete prefix, restore it
    if (!value.startsWith(PREFIX)) {
      setCardName(PREFIX);
    } else {
      setCardName(value);
    }
  };

  const handleCreate = async () => {
    setError('');
    setSuccess(null);

    // Validation
    if (cardName.trim() === PREFIX.trim()) {
      setError('Please enter card name after "[3D att] "');
      return;
    }

    if (!cardName.trim()) {
      setError('Card name is required');
      return;
    }

    setLoading(true);

    // Open blank window BEFORE async request to avoid popup blocker
    const newWindow = window.open('about:blank', '_blank');

    try {
      const response = await fetch('http://localhost:3001/api/confluence/create-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder, name: cardName })
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(result);

        // Update the opened window with actual URL
        if (result.url && newWindow) {
          newWindow.location.href = result.url;
        }

        // Reset form after short delay
        setTimeout(() => {
          setCardName(PREFIX);
          setSuccess(null);
        }, 3000);
      } else {
        setError(result.error || 'Failed to create card');

        // Check if error is related to authentication/token
        if (result.error && (
          result.error.includes('401') ||
          result.error.includes('Unauthorized') ||
          result.error.includes('Failed to connect')
        )) {
          setTokenExpired(true);
        }

        // Close the blank window if creation failed
        if (newWindow) {
          newWindow.close();
        }
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
      // Close the blank window on error
      if (newWindow) {
        newWindow.close();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 12,
      padding: 32,
      width: '100%',
      maxWidth: 500,
      border: '1px solid var(--border)',
    }}>
      {/* Token Expired Warning */}
      {tokenExpired && (
        <div style={{
          padding: '16px 20px',
          background: 'rgba(255, 69, 58, 0.1)',
          border: '2px solid var(--red)',
          borderRadius: 8,
          marginBottom: 24,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
          }}>
            <div style={{ fontSize: 24, lineHeight: 1 }}>⚠️</div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--red)',
                margin: '0 0 8px 0',
              }}>
                Confluence Token Expired
              </h3>
              <p style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                margin: '0 0 12px 0',
                lineHeight: 1.5,
              }}>
                Your Confluence Personal Access Token has expired or is invalid.
              </p>
              <div style={{
                padding: '10px 12px',
                background: 'var(--surface2)',
                borderRadius: 6,
                marginBottom: 12,
                fontFamily: 'var(--mono)',
                fontSize: 12,
              }}>
                <div style={{ color: 'var(--muted)', marginBottom: 4 }}>
                  Update token in:
                </div>
                <div style={{ color: 'var(--text)', wordBreak: 'break-all' }}>
                  C:\AI\AO Creator\backend\confluence-agent\.env
                </div>
              </div>
              <div style={{
                fontSize: 12,
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}>
                <strong>Steps:</strong>
                <br />
                1. Get new token: <a
                  href="https://confluence.wargaming.net/admin/users/viewmyaccesstokens.action"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--accent)',
                    textDecoration: 'none',
                  }}
                >
                  Confluence Settings
                </a>
                <br />
                2. Update CONFLUENCE_API_TOKEN in .env
                <br />
                3. Restart: stop.bat then start.bat
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Type Selection */}
      <div style={{ marginBottom: 24 }}>
        <label style={{
          display: 'block',
          marginBottom: 8,
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text-secondary)',
        }}>
          Document Type
        </label>
        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          disabled={loading || success}
          style={{
            width: '100%',
            fontSize: 14,
            padding: '10px 12px',
          }}
        >
          {DOCUMENT_TYPES.map((type) => (
            <option
              key={type.id}
              value={type.id}
              disabled={!type.enabled}
            >
              {type.label} {!type.enabled ? '(Coming Soon)' : ''}
            </option>
          ))}
        </select>
        <p style={{
          marginTop: 6,
          fontSize: 12,
          color: 'var(--muted)',
        }}>
          Select the type of document to create
        </p>
      </div>

      {/* Show form only for 3D Attachment Cards */}
      {documentType === '3d-attachment' ? (
        <>
          {/* Card Name Input */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}>
              Card Name
            </label>
            <input
              type="text"
              value={cardName}
              onChange={handleCardNameChange}
              placeholder="[3D att] T90M_01"
              disabled={loading || success}
              style={{
                width: '100%',
                fontSize: 14,
                fontFamily: 'var(--mono)',
              }}
            />
            <p style={{
              marginTop: 6,
              fontSize: 12,
              color: 'var(--muted)',
            }}>
              Format: [3D att] ProjectCode_01
            </p>
          </div>

          {/* Folder Selection */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}>
              Target Folder
            </label>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              disabled={loading || success || foldersLoading}
              style={{
                width: '100%',
                fontSize: 14,
              }}
            >
              {foldersLoading ? (
                <option value="">Loading folders...</option>
              ) : folders.length === 0 ? (
                <option value="">No folders available</option>
              ) : (
                folders.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))
              )}
            </select>
            {foldersLoading && (
              <p style={{
                marginTop: 6,
                fontSize: 12,
                color: 'var(--muted)',
              }}>
                Loading folders from Confluence...
              </p>
            )}
            {!foldersLoading && folders.length > 0 && (
              <p style={{
                marginTop: 6,
                fontSize: 12,
                color: 'var(--muted)',
              }}>
                {folders.length} folders available
              </p>
            )}
          </div>
        </>
      ) : (
        /* Coming Soon Message */
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          background: 'var(--surface2)',
          borderRadius: 8,
          border: '1px dashed var(--border)',
          marginBottom: 20,
        }}>
          <div style={{
            fontSize: 48,
            marginBottom: 16,
          }}>
            🚧
          </div>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            color: 'var(--text)',
            margin: '0 0 8px 0',
          }}>
            Coming Soon
          </h3>
          <p style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            margin: 0,
          }}>
            This document type is not yet available
          </p>
        </div>
      )}

      {/* Success Message */}
      {success && documentType === '3d-attachment' && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(48, 209, 88, 0.1)',
          border: '1px solid var(--green)',
          borderRadius: 8,
          marginBottom: 20,
          fontSize: 14,
          color: 'var(--green)',
        }}>
          ✅ Card created! Opening in browser...
        </div>
      )}

      {/* Error Message */}
      {error && !success && documentType === '3d-attachment' && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(255, 69, 58, 0.1)',
          border: '1px solid var(--red)',
          borderRadius: 8,
          marginBottom: 20,
          fontSize: 14,
          color: 'var(--red)',
        }}>
          {error}
        </div>
      )}

      {/* Create Button - Only for enabled document types */}
      {documentType === '3d-attachment' && (
        <button
        onClick={handleCreate}
        disabled={loading || success || cardName.trim() === PREFIX.trim()}
        style={{
          width: '100%',
          padding: '12px 20px',
          background: success
            ? 'var(--green)'
            : loading
              ? 'var(--muted)'
              : 'var(--accent)',
          border: 'none',
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          cursor: loading || success || cardName.trim() === PREFIX.trim() ? 'not-allowed' : 'pointer',
          color: '#fff',
          transition: 'background 150ms ease-out',
        }}
        onMouseEnter={e => {
          if (!loading && !success && cardName.trim() !== PREFIX.trim()) {
            e.currentTarget.style.background = 'var(--accent-hover)';
          }
        }}
        onMouseLeave={e => {
          if (!loading && !success) {
            e.currentTarget.style.background = 'var(--accent)';
          }
        }}
      >
        {success ? '✓ Created' : loading ? 'Creating...' : 'Create 3D Card'}
      </button>
      )}
    </div>
  );
}
