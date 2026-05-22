/**
 * AO Creator Backend API
 * Handles Confluence 3D ATT card creation
 */

import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ao-creator-backend' });
});

/**
 * Create Confluence 3D ATT Card
 * POST /api/confluence/create-card
 * Body: { folder: string, name: string }
 */
app.post('/api/confluence/create-card', async (req, res) => {
  const { folder, name } = req.body;

  // Validation
  if (!folder || !name) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: folder, name'
    });
  }

  try {
    const pythonPath = path.join(__dirname, 'confluence-agent', 'venv', 'Scripts', 'python.exe');
    const scriptPath = path.join(__dirname, 'confluence-agent', 'create_card_cli.py');

    console.log(`[Confluence] Creating card: "${name}" in folder "${folder}"`);

    // Spawn Python process
    const pythonProcess = spawn(pythonPath, [
      scriptPath,
      '--folder', folder,
      '--name', name,
      '--json'
    ], {
      cwd: path.join(__dirname, 'confluence-agent')
    });

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error(`[Confluence] Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(stdout);
          console.log(`[Confluence] Success: ${result.url}`);
          res.json(result);
        } catch (parseError) {
          console.error(`[Confluence] JSON parse error:`, parseError);
          res.status(500).json({
            success: false,
            error: 'Failed to parse response from Python agent',
            raw: stdout
          });
        }
      } else {
        console.error(`[Confluence] Process exited with code ${code}`);
        res.status(500).json({
          success: false,
          error: stderr || 'Python agent failed',
          code
        });
      }
    });

  } catch (error) {
    console.error(`[Confluence] Exception:`, error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get available Confluence folders
 * GET /api/confluence/folders
 */
app.get('/api/confluence/folders', async (req, res) => {
  try {
    const pythonPath = path.join(__dirname, 'confluence-agent', 'venv', 'Scripts', 'python.exe');
    const scriptPath = path.join(__dirname, 'confluence-agent', 'get_folders_cli.py');

    console.log(`[Confluence] Fetching folders list...`);

    // Spawn Python process
    const pythonProcess = spawn(pythonPath, [scriptPath], {
      cwd: path.join(__dirname, 'confluence-agent')
    });

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error(`[Confluence] Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(stdout);
          console.log(`[Confluence] Found ${result.folders?.length || 0} folders`);
          res.json(result);
        } catch (parseError) {
          console.error(`[Confluence] JSON parse error:`, parseError);
          res.status(500).json({
            success: false,
            error: 'Failed to parse response from Python agent',
            raw: stdout
          });
        }
      } else {
        console.error(`[Confluence] Process exited with code ${code}`);
        res.status(500).json({
          success: false,
          error: stderr || 'Python agent failed',
          code
        });
      }
    });

  } catch (error) {
    console.error(`[Confluence] Exception:`, error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AO Creator Backend running on http://localhost:${PORT}`);
  console.log(`📡 Confluence API: http://localhost:${PORT}/api/confluence/create-card`);
});
