import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Default port is 3000 (DEFAULT_APP_PORT) to avoid conflict with NGINX port 8080
const PORT = Number(process.env.DEFAULT_APP_PORT) || 3000;
const photosDir = path.resolve(__dirname, 'public/assets/photos');
const distPath = path.resolve(__dirname, 'dist');

// Ensure photos directory exists
if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
}

// Multer storage for uploaded photos
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, photosDir);
  },
  filename: (_req, file, cb) => {
    const decodedName = decodeURIComponent(file.originalname);
    cb(null, decodedName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

app.use(express.json());

// API: List existing photos
app.get('/api/photos/list', (_req, res) => {
  try {
    const files = fs
      .readdirSync(photosDir)
      .filter((f) => !f.startsWith('.') && !f.endsWith('.md'));
    res.json({ files });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// API: Upload photos directly to public/assets/photos
app.post('/api/photos/upload', upload.array('photos', 50), (req, res) => {
  try {
    const files = (req.files as Express.Multer.File[]) || [];
    const savedNames = files.map((f) => f.filename);

    // Also copy to dist/assets/photos if dist exists so production has it immediately
    const distPhotosDir = path.resolve(distPath, 'assets/photos');
    if (fs.existsSync(distPhotosDir)) {
      for (const file of files) {
        fs.copyFileSync(file.path, path.resolve(distPhotosDir, file.filename));
      }
    }

    res.json({
      success: true,
      message: `Uploaded ${files.length} file(s) to server!`,
      savedNames,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Explicitly serve static photos
app.use('/assets/photos', express.static(photosDir));

async function startServer() {
  const isDev = process.env.DEV_MODE === 'true';

  if (isDev) {
    // Development mode with Vite middleware and HTML transformation
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, port: PORT, host: '0.0.0.0' },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    // Transform index.html with Vite on all non-static HTML routes
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production / Deployed mode: Serve pre-built static bundle
    app.use(express.static(distPath));

    app.get('*', (_req, res) => {
      const indexFile = path.resolve(distPath, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Application build not found. Run "npm run build" first.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[App] Server listening on http://0.0.0.0:${PORT} (Mode: ${isDev ? 'Development' : 'Production'})`);
  });
}

startServer();
