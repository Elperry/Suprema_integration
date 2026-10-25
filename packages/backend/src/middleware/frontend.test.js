import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import express from 'express';
import request from 'supertest';
import { mountFrontend } from './frontend.js';

function distDir() {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gate-ui-'));
    fs.writeFileSync(path.join(dir, 'index.html'), '<html>gate ui</html>');
    fs.mkdirSync(path.join(dir, 'assets'));
    fs.writeFileSync(path.join(dir, 'assets', 'app.js'), 'console.log(1)');
    return dir;
}

function appWith(dir) {
    const app = express();
    app.get('/api/ping', (req, res) => res.json({ ok: true }));
    const mounted = mountFrontend(app, dir);
    app.use((req, res) => res.status(404).json({ error: 'not found' }));
    return { app, mounted };
}

test('the built UI and its assets are served', async () => {
    const { app } = appWith(distDir());
    assert.match((await request(app).get('/')).text, /gate ui/);
    assert.match((await request(app).get('/assets/app.js')).text, /console/);
});

test('client-side routes fall back to index.html', async () => {
    const { app } = appWith(distDir());
    assert.match((await request(app).get('/devices/12')).text, /gate ui/);
});

test('unknown API paths stay JSON 404s, never the UI', async () => {
    const { app } = appWith(distDir());
    const res = await request(app).get('/api/nope');
    assert.equal(res.status, 404);
    assert.deepEqual(res.body, { error: 'not found' });
    assert.equal((await request(app).get('/api/ping')).body.ok, true);
});

test('no dist directory: nothing is mounted', () => {
    const { mounted } = appWith(path.join(os.tmpdir(), 'does-not-exist-gate-ui'));
    assert.equal(mounted, false);
});
