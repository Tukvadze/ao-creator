# AO Creator - Deployment Guide

## Important Note About Deployment

**AO Creator requires a backend server** and cannot be fully deployed to static hosting like GitHub Pages.

The application consists of:
1. **Frontend** (React) - can be hosted anywhere
2. **Backend** (Node.js + Express) - needs a server
3. **Python Agent** - needs Python runtime + Confluence access

## Why GitHub Pages Won't Work

GitHub Pages only hosts static files (HTML, CSS, JS). AO Creator needs:
- ❌ Node.js server running on port 3001
- ❌ Python runtime for Confluence API
- ❌ Server-side environment variables (.env)
- ❌ Network access to internal Confluence

## Recommended Usage

### Option 1: Local Development (Recommended)
**Best for internal company use**

```bash
# Just run locally
cd "C:\AI\AO Creator"
start.bat
```

**Advantages:**
- ✅ Full functionality
- ✅ Direct Confluence access
- ✅ Easy token management
- ✅ No hosting costs
- ✅ Works on company network

**Share with team:**
```
1. Share the folder: C:\AI\AO Creator
2. Team members run: start.bat
3. Everyone has their own token
```

### Option 2: Internal Server (Advanced)
**For team-wide deployment**

Requirements:
- Windows/Linux server with Node.js + Python
- Access to Confluence API
- Shared Confluence token (or multi-user auth)

Steps:
1. Deploy to internal server
2. Run backend: `node backend/server.js`
3. Run frontend: `npm run preview` (production build)
4. Configure firewall for ports 3001, 5173
5. Share URL: `http://your-server:5173`

### Option 3: Desktop Application (Future)
**Package as standalone app**

Could use:
- Electron (full desktop app)
- Tauri (lightweight alternative)
- Docker container

This would bundle everything into one executable.

## What IS Deployed to GitHub

The GitHub repository (https://github.com/Tukvadze/ao-creator) contains:
- ✅ Source code
- ✅ Documentation
- ✅ Installation scripts
- ✅ Version history

**Purpose:** Code sharing, version control, collaboration

**Not for:** Running the live application

## GitHub Pages Note

We've configured GitHub Pages to deploy the frontend for demonstration:
- **URL:** https://tukvadze.github.io/ao-creator/
- **Status:** ⚠️ Frontend only (no backend)
- **Functionality:** Limited - shows UI but can't create cards

This is useful for:
- Previewing UI changes
- Design review
- Documentation hosting

But **not** for actual usage.

## Recommended Deployment Strategy

**For your company:**

1. **Individual Use:**
   ```
   Each developer runs locally with start.bat
   ```

2. **Team Use:**
   ```
   Share folder on network drive
   Everyone runs their own instance
   ```

3. **Production Use:**
   ```
   Deploy to internal company server
   Configure shared Confluence token
   Set up internal DNS/URL
   ```

## Security Considerations

**Why local is better:**
- ✅ Token stays on your machine
- ✅ No shared credentials
- ✅ Direct Confluence access (no proxy)
- ✅ No hosting security concerns

**If deploying to server:**
- 🔒 Use HTTPS
- 🔒 Restrict network access
- 🔒 Rotate tokens regularly
- 🔒 Use environment-specific configs
- 🔒 Add authentication layer

## Alternative: Backend-Only Deployment

If you want to share with team:

1. **Deploy backend to server:**
   ```bash
   # On server
   cd backend
   node server.js
   ```

2. **Update frontend to use server URL:**
   ```javascript
   // src/components/CreateCardForm.jsx
   const response = await fetch('http://your-server:3001/api/...');
   ```

3. **Each user runs frontend locally:**
   ```bash
   npm run dev
   ```

This way:
- Backend is centralized (one token)
- Frontend runs locally (no hosting needed)
- Easier to maintain

## Summary

| Method | Pros | Cons | Recommended |
|--------|------|------|-------------|
| **Local (start.bat)** | Easy, secure, full functionality | Each person needs setup | ✅ **YES** |
| **GitHub Pages** | Free hosting | Frontend only, no backend | ❌ No |
| **Internal Server** | Team-wide, one URL | Needs infrastructure | ⚠️ Maybe |
| **Docker** | Portable, isolated | Complex setup | ⚠️ Future |

## Conclusion

**For now, use local deployment:**
```bash
start.bat
```

**Share via:**
- Network folder
- Git repository
- ZIP file

**Don't expect to:**
- Use GitHub Pages URL for creating cards
- Deploy to Vercel/Netlify/etc.
- Run frontend-only

The backend is essential for Confluence integration.

---

**Questions?** See [README.md](README.md) or [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
