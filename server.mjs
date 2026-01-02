import { handler as ssrHandler } from './dist/server/entry.mjs';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configurar puerto y host ANTES de crear el servidor
const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || '0.0.0.0';

console.log(`[server.mjs] Starting server with PORT=${port} and HOST=${host}`);

// Servir archivos estáticos del client
app.use(express.static(join(__dirname, 'dist', 'client')));

// Usar el handler de Astro para SSR
app.use(ssrHandler);

// Iniciar servidor
app.listen(port, host, () => {
  console.log(`[server.mjs] Server listening on http://${host}:${port}`);
});
