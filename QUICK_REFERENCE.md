# AO Creator - Quick Reference

## 🚀 Start / Stop

```bash
# Start (hidden, no CMD window)
start-hidden.vbs

# Start (with CMD window for debugging)
start.bat

# Stop everything
stop.bat
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `start.bat` | Main startup script |
| `stop.bat` | Stop all services |
| `backend/confluence-agent/.env` | **Confluence credentials (update token here!)** |
| `backend/confluence-agent/config/settings.json` | Confluence settings |

## 🔑 Update Token (When Expired)

**Quick:**
```
1. Edit: backend/confluence-agent/.env
2. Line 4: CONFLUENCE_API_TOKEN=new_token_here
3. Run: stop.bat then start.bat
```

**Detailed:** See [TOKEN_UPDATE.md](TOKEN_UPDATE.md) or [UPDATE_TOKEN.txt](UPDATE_TOKEN.txt)

**Get new token:** https://confluence.wargaming.net/admin/users/viewmyaccesstokens.action

## 📡 API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /api/health` | Check backend status |
| `GET /api/confluence/folders` | Get available folders |
| `POST /api/confluence/create-card` | Create 3D card |

**Base URL:** `http://localhost:3001`

## 🔧 Troubleshooting

### "Failed to connect to Confluence"
→ Token expired. Update in `.env` file.

### "Network error: Failed to fetch"
→ Backend not running. Run `start.bat`

### No folders loading
→ Check backend logs. Restart backend.

### Port already in use
→ Run `stop.bat` to clean up old processes


## 🏗️ Project Structure

```
AO Creator/
├── src/
│   ├── components/
│   │   └── CreateCardForm.jsx    # Main UI
│   ├── App.jsx                    
│   └── index.css                  
├── backend/
│   ├── server.js                  # Node.js API
│   └── confluence-agent/
│       ├── .env                   # ← TOKEN HERE
│       ├── create_card_cli.py     
│       ├── get_folders_cli.py     
│       └── agent/
│           └── confluence_client.py
├── start.bat                      # ← START
├── stop.bat                       # ← STOP
└── UPDATE_TOKEN.txt               # ← WHEN TOKEN EXPIRES
```

## 📚 Documentation

- [README.md](README.md) - Full guide
- [TOKEN_UPDATE.md](TOKEN_UPDATE.md) - Token update instructions
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues

## 🆘 Need Help?

1. Check logs in terminal
2. Check Python logs: `backend/confluence-agent/logs/operations.log`
3. Check browser console (F12)
4. Test API: `curl http://localhost:3001/api/health`
