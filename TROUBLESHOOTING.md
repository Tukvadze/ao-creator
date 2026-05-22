# AO Creator - Troubleshooting Guide

## 🔴 Token Expired Error

### Symptoms:
- Red warning box at top of form: **"⚠️ Confluence Token Expired"**
- Folders not loading
- Error: "401 Unauthorized" or "Failed to connect to Confluence"

### Solution:

**1. Generate New Token:**
- Open: https://confluence.wargaming.net/admin/users/viewmyaccesstokens.action
- Click "Create Token"
- Name: "AO Creator"
- Copy token immediately

**2. Update Token:**
```
File: C:\AI\AO Creator\backend\confluence-agent\.env
Line: CONFLUENCE_API_TOKEN=paste_new_token_here
```

**3. Restart:**
```bash
stop.bat
start.bat
```

**4. Refresh browser** (F5)

---

## 🔴 Network Error: Failed to fetch

### Symptoms:
- Error message: "Network error: Failed to fetch"
- Cannot create cards
- Folders show fallback list only

### Solution:

**Backend not running. Start it:**
```bash
cd "C:\AI\AO Creator"
start.bat
```

**Or check manually:**
```bash
curl http://localhost:3001/api/health
```

Should return: `{"status":"ok","service":"ao-creator-backend"}`

---

## 🔴 No Folders Loading / Only 2 Folders

### Symptoms:
- Only see "Attachments 2025" and "Attachments 2026"
- Should see more folders (2027, Reserve registry, etc.)

### Solution:

**1. Check backend is running:**
```bash
curl http://localhost:3001/api/confluence/folders
```

**2. If not running, start it:**
```bash
cd "C:\AI\AO Creator"
stop.bat
start.bat
```

**3. Refresh browser** (F5)

---

## 🔴 Port Already in Use

### Symptoms:
- Error: "Port 3001 is already in use"
- Error: "Port 5173 is already in use"

### Solution:

**Clean up old processes:**
```bash
cd "C:\AI\AO Creator"
stop.bat
```

Wait 5 seconds, then:
```bash
start.bat
```

---

## 🔴 Python venv Not Found

### Symptoms:
- Error: "venv not found"
- Backend fails to start

### Solution:

**Recreate Python environment:**
```bash
cd "C:\AI\AO Creator\backend\confluence-agent"

# Create venv
"C:\Users\v_tukvadze\AppData\Local\Programs\Python\Python314\python.exe" -m venv venv

# Install dependencies
venv\Scripts\pip.exe install -r requirements.txt
```

---

## 🔴 Card Creation Failed

### Symptoms:
- Error: "Failed to create card"
- Error: "Folder 'XXX' not found"

### Possible Causes:

**1. Token expired** → See "Token Expired Error" above

**2. Invalid folder name:**
- Make sure folder exists in Confluence
- Check spelling matches exactly

**3. Invalid card name format:**
- Must start with `[3D att] `
- Format: `[3D att] CODE_XX`
- Example: `[3D att] T90M_01`

---

## 🟡 Popup Blocked

### Symptoms:
- Card created successfully
- Browser doesn't open automatically

### Solution:

**Allow popups for localhost:**
1. Click popup icon in address bar
2. Select "Always allow popups from localhost"
3. Try creating card again

Or check browser console (F12) for popup blocker message.

---

## 🟢 Everything Works - How to Verify

### Quick Health Check:

**1. Backend:**
```bash
curl http://localhost:3001/api/health
# Should return: {"status":"ok"}
```

**2. Folders:**
```bash
curl http://localhost:3001/api/confluence/folders
# Should return: {"success":true,"folders":[...]}
```

**3. Frontend:**
- Open: http://localhost:5173
- Should see form with document type selector
- Should see multiple folders in dropdown
- No red warning boxes

---

## 📋 Logs Location

### Backend Logs:
- **Console output:** In terminal where you ran `start.bat`
- **Python logs:** `backend/confluence-agent/logs/operations.log`

### Browser Logs:
- Open DevTools: **F12**
- Go to **Console** tab
- Look for errors in red

### How to enable verbose logging:
```bash
cd backend
set DEBUG=true
node server.js
```

---

## 🆘 Still Having Issues?

1. **Check all logs** (backend console, Python logs, browser console)
2. **Verify token** is valid and not expired
3. **Test Python script** directly:
   ```bash
   cd backend/confluence-agent
   venv\Scripts\python.exe get_folders_cli.py
   ```
4. **Clean restart:**
   ```bash
   stop.bat
   # Wait 10 seconds
   start.bat
   ```
5. **Check network:** Can you access https://confluence.wargaming.net ?

---

## 📞 Quick Reference

| Issue | File to Check/Edit |
|-------|-------------------|
| Token expired | `backend/confluence-agent/.env` |
| Backend not starting | Check console, check port 3001 |
| Folders not loading | Test `/api/confluence/folders` |
| Python errors | Check `backend/confluence-agent/logs/operations.log` |
| Frontend errors | Open browser DevTools (F12) |
