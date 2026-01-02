import { handler as ssrHandler } from './dist/server/entry.mjs';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Servir archivos estáticos del client
app.use(express.static(join(__dirname, 'dist', 'client')));

// Usar el handler de Astro para SSR
app.use(ssrHandler);

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`[@astrojs/node] Server listening on http://${host}:${port}`);
});
