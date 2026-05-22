# Updating Confluence Personal Access Token

When your Confluence Personal Access Token expires, follow these steps to update it.

## Step 1: Generate New Token in Confluence

1. Go to **Confluence Settings** → **Personal Access Tokens**
   - Direct link: https://confluence.wargaming.net/admin/users/viewmyaccesstokens.action
2. Click **"Create Token"**
3. Give it a name (e.g., "AO Creator Token")
4. Set expiration (e.g., 1 year)
5. Click **"Create"**
6. **Copy the token immediately** (you won't be able to see it again!)

## Step 2: Update Token in AO Creator

**File to edit:** `backend/confluence-agent/.env`

**Location:** `C:\AI\AO Creator\backend\confluence-agent\.env`

**Update this line:**
```env
CONFLUENCE_API_TOKEN=YOUR_NEW_TOKEN_HERE
```

### Example:

**Before:**
```env
# Confluence API Credentials
CONFLUENCE_URL=https://confluence.wargaming.net
CONFLUENCE_EMAIL=v_tukvadze@wargaming.net
CONFLUENCE_API_TOKEN=old_expired_token_12345
```

**After:**
```env
# Confluence API Credentials
CONFLUENCE_URL=https://confluence.wargaming.net
CONFLUENCE_EMAIL=v_tukvadze@wargaming.net
CONFLUENCE_API_TOKEN=new_token_67890_abc_xyz
```

## Step 3: Restart Backend

After updating the token, restart the backend:

```bash
cd "C:\AI\AO Creator"

# Stop everything
stop.bat

# Start again
start.bat
```

Or manually:
```bash
# Stop backend
taskkill /F /FI "WINDOWTITLE eq *node*"

# Start backend
cd backend
node server.js
```

## Step 4: Test Connection

1. Open browser: http://localhost:5173
2. Try to create a card
3. If it works - token is valid! ✅

Or test via API:
```bash
curl http://localhost:3001/api/confluence/folders
```

Should return:
```json
{
  "success": true,
  "folders": ["Attachments 2025", "Attachments 2026", ...]
}
```

## Troubleshooting

### Error: "Failed to connect to Confluence"

**Possible causes:**
1. Token expired → Generate new token
2. Token copied incorrectly → Check for extra spaces/newlines
3. Wrong permissions → Token needs read/write access to Confluence

### Error: "401 Unauthorized"

Token is invalid. Generate a new one and update `.env`.

### Error: "Network error: Failed to fetch"

Backend not running. Check:
```bash
# Check if backend is running
curl http://localhost:3001/api/health

# If not, start it
cd "C:\AI\AO Creator"
start.bat
```

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` file to git
- Never share your token publicly
- Keep token secure like a password
- Revoke old tokens after generating new ones

## Token Permissions Required

Your Confluence token needs:
- ✅ Read access to pages
- ✅ Write access to create pages
- ✅ Access to specific space (e.g., "AO" space)

## Quick Reference

| What | Where |
|------|-------|
| **Generate token** | https://confluence.wargaming.net/admin/users/viewmyaccesstokens.action |
| **Update token** | `C:\AI\AO Creator\backend\confluence-agent\.env` |
| **Line to edit** | `CONFLUENCE_API_TOKEN=...` |
| **Restart** | `stop.bat` then `start.bat` |
| **Test** | http://localhost:3001/api/health |
