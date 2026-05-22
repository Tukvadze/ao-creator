# GitHub Setup Instructions

## Create GitHub Repository

Follow these steps to push AO Creator to GitHub:

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `ao-creator`
   - **Description:** "Create Confluence 3D Attachment cards with ease"
   - **Visibility:** Public (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

### Step 2: Push Local Code

After creating the repository, run these commands:

```bash
cd "C:\AI\AO Creator"

# Verify remote is set correctly
git remote -v

# If remote is not set, add it:
git remote add origin https://github.com/Tukvadze/ao-creator.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages (Optional)

**Note:** GitHub Pages will only show the UI preview, not full functionality.

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: Select `main` and `/root` folder
4. Save

The GitHub Actions workflow will automatically deploy on each push.

**Preview URL:** https://tukvadze.github.io/ao-creator/

⚠️ **Important:** This URL shows the UI only. To create cards, you must run locally with `start.bat`.

### Step 4: Configure Repository Settings (Optional)

**Add topics:**
- confluence
- react
- vite
- nodejs
- python
- wargaming
- 3d-attachment

**Add description:**
```
Create Confluence 3D Attachment cards with a clean, dark-themed UI
```

**Update README:**
- GitHub will automatically use `.github/README.md` as the repository README

### Step 5: Verify Everything Works

After pushing, verify:

1. **Repository:** https://github.com/Tukvadze/ao-creator
   - [ ] All files are present
   - [ ] README displays correctly
   - [ ] Documentation is accessible

2. **GitHub Actions:**
   - Go to Actions tab
   - [ ] Workflow runs successfully
   - [ ] Build completes without errors

3. **GitHub Pages (if enabled):**
   - Wait 2-3 minutes for deployment
   - [ ] Visit https://tukvadze.github.io/ao-creator/
   - [ ] UI loads (but won't create cards without backend)

## Troubleshooting

### "Repository not found"

**Solution:** Create the repository on GitHub first (Step 1)

### "Permission denied"

**Solution:** Set up authentication:

**Option A: Personal Access Token (Recommended)**
1. GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. When git asks for password, use the token

**Option B: SSH**
1. Generate SSH key: `ssh-keygen -t ed25519 -C "v_tukvadze@wargaming.net"`
2. Add to GitHub: Settings → SSH and GPG keys
3. Change remote URL: `git remote set-url origin git@github.com:Tukvadze/ao-creator.git`

### "Updates were rejected"

**Solution:** Pull first (shouldn't happen on new repo):
```bash
git pull origin main --rebase
git push -u origin main
```

## What Gets Pushed

✅ **Included:**
- All source code
- Documentation
- Scripts (start.bat, stop.bat)
- Configuration files
- GitHub Actions workflow

❌ **Excluded (via .gitignore):**
- node_modules/
- Python venv/
- .env files (credentials)
- Build output (dist/)
- Logs

## After Push

Share with your team:

**Repository URL:**
```
https://github.com/Tukvadze/ao-creator
```

**Installation instructions:**
```bash
git clone https://github.com/Tukvadze/ao-creator.git
cd ao-creator
# Edit backend/confluence-agent/.env with your token
start.bat
```

## Keeping It Updated

When you make changes:

```bash
cd "C:\AI\AO Creator"

# Check what changed
git status

# Stage changes
git add .

# Commit with message
git commit -m "Your change description

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to GitHub
git push
```

GitHub Actions will automatically rebuild and deploy to Pages.

## Security Note

⚠️ **Never push `.env` files!**

The `.gitignore` file prevents this, but always verify:
```bash
git status
```

Should NOT show:
- `backend/confluence-agent/.env`
- Any files with tokens/credentials

## Summary

1. ✅ Create repository on GitHub
2. ✅ Push code: `git push -u origin main`
3. ✅ Enable GitHub Pages (optional)
4. ✅ Share repository URL with team
5. ✅ Team clones and runs locally

**Result:** Code is on GitHub, team can access, but everyone runs locally for full functionality.

---

**Ready?** Go to https://github.com/new and create `ao-creator` repository!
