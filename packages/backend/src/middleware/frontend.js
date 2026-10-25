/**
 * Serves the built operator UI (packages/frontend/dist) from this backend, so
 * the gate PC runs one process on 127.0.0.1 instead of the Vite dev server.
 * Static files are public (they hold no data); every /api call still needs
 * the token. Client-side routes fall back to index.html; /api and /health
 * paths are never answered with the UI.
 */
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';

/** @returns {boolean} whether the UI was mounted */
export function mountFrontend(app, distDir) {
    const indexFile = path.join(distDir, 'index.html');
    if (!fs.existsSync(indexFile)) return false;

    app.use(express.static(distDir, { index: 'index.html', fallthrough: true }));
    app.get(/^(?!\/api(\/|$)|\/health(\/|$)).*/, (req, res) => res.sendFile(indexFile));
    return true;
}
