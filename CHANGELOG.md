# Changelog

All notable changes to AO Creator.

## [1.0.0] - 2026-05-22

### Added
- Initial release
- Create Confluence 3D Attachment cards
- Dynamic folder loading from Confluence API
- Automatic token expiration detection
- Auto-open created cards in browser
- Protected `[3D att] ` prefix in card name input
- Dark theme matching AO Tracker
- Lightning bolt favicon
- Complete documentation suite
- Windows batch scripts for easy startup

### Technical
- React 19 + Vite frontend
- Node.js + Express backend
- Python agent with atlassian-python-api
- Personal Access Token authentication
- Hidden process execution (no console windows)
- Automatic dependency installation

### Documentation
- README.md - Main guide
- QUICK_REFERENCE.md - Quick start
- TOKEN_UPDATE.md - Token renewal
- TROUBLESHOOTING.md - Common issues
- RELEASE_NOTES.md - Release info

---

## Optimization (2026-05-22)

### Improved
- ✅ Favicon readability (white background, larger bolt, no artifacts)
- ✅ README simplified and concise
- ✅ Removed unnecessary documentation files
- ✅ Code verified (no dead code, no unused imports)
- ✅ Build optimized (198 KB gzipped)

### Removed
- TOKEN_WARNING_PREVIEW.md (not needed)
- LOGO_PREVIEW.txt (finalized)
- LOGO_VARIANTS.md (finalized)
- ADDING_NEW_TYPES.md (simplified)
- API.md (internal details)

### Fixed
- Favicon visibility on dark browser tabs
- Documentation references updated
- All builds pass successfully
- Backend health check verified

---

**Status:** Ready for production ✅
