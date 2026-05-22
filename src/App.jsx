import { useState } from 'react';
import CreateCardForm from './components/CreateCardForm';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      {/* Header */}
      <div style={{
        marginBottom: 40,
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 600,
          color: 'var(--text)',
          marginBottom: 8,
        }}>
          AO Creator
        </h1>
        <p style={{
          fontSize: 14,
          color: 'var(--text-secondary)',
        }}>
          Create Confluence 3D Attachment Cards
        </p>
      </div>

      {/* Main Card */}
      <CreateCardForm />

      {/* Footer */}
      <div style={{
        marginTop: 40,
        fontSize: 12,
        color: 'var(--muted)',
        textAlign: 'center',
      }}>
        Connected to Confluence @ confluence.wargaming.net
      </div>
    </div>
  );
}

export default App;
