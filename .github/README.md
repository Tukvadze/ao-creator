# AO Creator

<div align="center">

⚡ **Create Confluence 3D Attachment Cards with Ease**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Tukvadze/ao-creator)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Node-18+-339933.svg)](https://nodejs.org/)

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Documentation](#documentation)

</div>

---

## 📖 Overview

**AO Creator** is a streamlined desktop application for creating Confluence 3D Attachment cards. Built with React 19, Node.js, and Python, it provides a clean, dark-themed interface matching the AO Tracker design.

> ⚠️ **Note:** This app requires a backend server and must run locally. It cannot be fully deployed to static hosting like GitHub Pages.

## ✨ Features

- ✅ **Create 3D Attachment Cards** - Streamlined card creation workflow
- ✅ **Dynamic Folder Loading** - Automatically loads available folders from Confluence
- ✅ **Token Expiration Detection** - Clear warnings when credentials need renewal
- ✅ **Auto-Open Cards** - Created cards open automatically in browser
- ✅ **Protected Prefix** - `[3D att] ` prefix is always maintained
- ✅ **Dark Theme** - Clean UI matching AO Tracker design
- ✅ **One-Click Startup** - Simple `start.bat` launcher
- ✅ **Hidden Processes** - No console windows cluttering your workspace

## 🚀 Installation

### Prerequisites

- Windows 10/11
- Node.js v18+ ([Download](https://nodejs.org/))
- Python 3.8+ (usually pre-installed on Windows)
- Confluence Personal Access Token

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tukvadze/ao-creator.git
   cd ao-creator
   ```

2. **Configure Confluence credentials:**
   ```bash
   # Copy .env.example to .env
   cp backend/confluence-agent/.env.example backend/confluence-agent/.env
   
   # Edit .env and add your Confluence token
   notepad backend\confluence-agent\.env
   ```

3. **Start the application:**
   ```bash
   start.bat
   ```

That's it! Dependencies install automatically on first run.

## 📝 Usage

1. **Launch:** Double-click `start.bat`
2. **Enter card name:** Type after the `[3D att] ` prefix (e.g., `T90M_01`)
3. **Select folder:** Choose from dynamically loaded folders
4. **Create:** Click "Create 3D Card"
5. **Done:** Card opens automatically in your browser!

## 🔑 Confluence Token Setup

1. Go to [Confluence Settings → Personal Access Tokens](https://confluence.wargaming.net/admin/users/viewmyaccesstokens.action)
2. Click "Create Token"
3. Name: "AO Creator"
4. Expiration: 1 year
5. Copy token immediately
6. Paste into `backend/confluence-agent/.env`:
   ```env
   CONFLUENCE_API_TOKEN=your_token_here
   ```
7. Restart: `stop.bat` then `start.bat`

See [TOKEN_UPDATE.md](TOKEN_UPDATE.md) for detailed instructions.

## 📚 Documentation

- **[README.md](README.md)** - Main documentation
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick start guide
- **[TOKEN_UPDATE.md](TOKEN_UPDATE.md)** - Token renewal instructions
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment options explained
- **[RELEASE_NOTES.md](RELEASE_NOTES.md)** - Release information
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │  ← UI (localhost:5173)
└────────┬────────┘
         │ HTTP REST
┌────────▼────────┐
│  Node.js Backend│  ← API (localhost:3001)
└────────┬────────┘
         │ CLI
┌────────▼────────┐
│  Python Agent   │  ← Confluence API
└────────┬────────┘
         │ REST API
┌────────▼────────┐
│   Confluence    │  ← Wargaming Confluence
└─────────────────┘
```

## 🛠️ Tech Stack

**Frontend:**
- React 19.2.6
- Vite 8.0.14
- CSS Custom Properties (Dark Theme)

**Backend:**
- Node.js + Express 4.18.2
- Python 3.14
- atlassian-python-api 4.0.7

**Development:**
- ESLint 10.3.0
- Hot Module Replacement
- Automatic dependency installation

## 🧪 Testing

```bash
# Build frontend
npm run build

# Test backend
cd backend
node server.js

# Test Python agent
cd backend/confluence-agent
venv\Scripts\python get_folders_cli.py
```

## 📊 Project Stats

- **Code:** ~1,300 lines (667 frontend + 615 backend)
- **Build size:** 198 KB (gzipped)
- **Build time:** ~100ms
- **Startup time:** ~3 seconds
- **Documentation:** 9 comprehensive guides

## ⚠️ Important Notes

### Why Not GitHub Pages?

AO Creator **requires a backend server** and cannot run on static hosting:
- ❌ Needs Node.js server (port 3001)
- ❌ Needs Python runtime
- ❌ Needs server-side environment variables
- ❌ Needs network access to internal Confluence

### Recommended Usage

**Best practice:** Run locally with `start.bat`

**Share with team:**
1. Share folder on network drive, or
2. Clone from GitHub
3. Each user runs their own instance with their own token

See [DEPLOYMENT.md](DEPLOYMENT.md) for alternative deployment options.

## 🔒 Security

- ✅ Token-based authentication
- ✅ Credentials in `.env` (not in code)
- ✅ `.env` excluded from git
- ✅ No hardcoded secrets
- ✅ HTTPS to Confluence
- ✅ Token expiration detection

## 🤝 Contributing

This is an internal tool for Wargaming. If you want to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use and modify for your organization.

## 💬 Support

**Issues?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Questions?** See documentation in repository root.

## 🎯 Roadmap

Potential future enhancements:
- [ ] Jira Tasks creation
- [ ] Confluence Pages creation
- [ ] Design Documents support
- [ ] Batch operations
- [ ] Custom templates
- [ ] Multi-language support

## 🙏 Credits

Built with [Claude Code](https://claude.ai/claude-code)

Design inspired by AO Tracker

---

<div align="center">

**Made with ⚡ by Tukvadze**

[GitHub](https://github.com/Tukvadze/ao-creator) • [Report Issue](https://github.com/Tukvadze/ao-creator/issues)

</div>
