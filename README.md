# AO Creator

Web application for creating Confluence 3D Attachment cards.

## Features

- ✅ Create 3D Attachment cards
- ✅ Dynamic folder loading from Confluence
- ✅ Automatic token expiration detection
- ✅ Opens created card in browser
- ✅ Dark theme matching AO Tracker

## Quick Start

**Just double-click:**
```
start.bat
```

This will:
1. Auto-install dependencies (first time only)
2. Start backend API (hidden in background)
3. Start frontend dev server
4. Open browser automatically at http://localhost:5173

**To stop:**
```
stop.bat
```

## How to Use

1. Enter card name after `[3D att] ` prefix (e.g., "T90M_01")
2. Select target folder
3. Click "Create 3D Card"
4. Card opens in browser automatically

## Requirements

- Node.js v18+
- Python 3.8+ (auto-detected at `C:\Users\...\Python314`)
- Confluence access with Personal Access Token

## Configuration

Backend uses credentials from `backend/confluence-agent/.env`:

```env
CONFLUENCE_URL=https://confluence.wargaming.net
CONFLUENCE_EMAIL=your-email@wargaming.net
CONFLUENCE_API_TOKEN=your_token_here
```

**When token expires:** See [TOKEN_UPDATE.md](TOKEN_UPDATE.md) or [UPDATE_TOKEN.txt](UPDATE_TOKEN.txt)

## Tech Stack

- **Frontend:** React 19 + Vite
- **Backend:** Node.js + Express
- **Agent:** Python (atlassian-python-api)
- **Style:** Dark theme matching AO Tracker

## Project Structure

```
AO Creator/
├── src/
│   ├── components/
│   │   └── CreateCardForm.jsx    # Main form
│   ├── App.jsx                    # App shell
│   └── index.css                  # AO Tracker theme
├── backend/
│   ├── server.js                  # Express API
│   └── confluence-agent/
│       ├── create_card_cli.py     # Python CLI
│       ├── agent/
│       │   └── confluence_client.py
│       └── config/
│           └── settings.json
├── start.bat                      # Main startup
├── stop.bat                       # Stop services
└── start-backend-hidden.vbs       # Hidden backend launcher
```

## Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues.
