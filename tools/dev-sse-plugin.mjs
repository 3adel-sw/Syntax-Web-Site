// tools/dev-sse-plugin.mjs
// ============================================================
// Vite dev plugin: mock SSE stream for /api/events/stream
// ============================================================
// In production, this endpoint lives on the backend (Laravel).
// See docs/BACKEND-SSE-SPEC.md for the protocol contract.
//
// In dev, the backend isn't running this endpoint yet — so the
// browser logs "EventSource 404" on every page. This plugin
// intercepts the request and returns a valid SSE stream so:
//   1. No console errors
//   2. Frontend integration is testable
//   3. Hot-reload doesn't break the stream
//
// Usage (vite.config.js):
//   import { devSsePlugin } from './tools/dev-sse-plugin.mjs';
//   plugins: [react(), tailwindcss(), devSsePlugin()]
// ============================================================

import { randomUUID } from 'node:crypto';

// In-memory pub-sub: lets the developer simulate a backend event push
// by hitting POST /__dev__/sse-test/push?type=event-created
const subscribers = new Set();

function addSubscriber(res) {
  subscribers.add(res);
  return () => subscribers.delete(res);
}

function broadcast(eventName, data) {
  const payload =
    `event: ${eventName}\n` +
    `id: ${randomUUID()}\n` +
    `data: ${JSON.stringify(data)}\n\n`;
  for (const res of subscribers) {
    try {
      res.write(payload);
    } catch (_) {
      subscribers.delete(res);
    }
  }
}

export function devSsePlugin() {
  return {
    name: 'syntax-dev-sse-mock',
    apply: 'serve', // dev only

    configureServer(server) {
      // ---- Main stream endpoint ----
      server.middlewares.use('/api/events/stream', (req, res) => {
        // SSE headers
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Tell the client the stream is open
        res.writeHead(200);
        res.write(': connected\n\n');
        res.write(`event: ping\ndata: ${JSON.stringify({ ts: Date.now() })}\n\n`);

        // Heartbeat every 25s
        const heartbeat = setInterval(() => {
          try {
            res.write(`event: ping\ndata: ${JSON.stringify({ ts: Date.now() })}\n\n`);
          } catch (_) {
            clearInterval(heartbeat);
          }
        }, 25_000);

        // Cleanup when client disconnects
        const unsubscribe = addSubscriber(res);
        req.on('close', () => {
          clearInterval(heartbeat);
          unsubscribe();
          try {
            res.end();
          } catch (_) {}
        });
      });

      // ---- Dev-only test endpoint: simulate a backend push ----
      // POST /__dev__/sse-test/push?type=event-created
      server.middlewares.use('/__dev__/sse-test/push', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'POST only' }));
          return;
        }

        const url = new URL(req.url, 'http://localhost');
        const type = url.searchParams.get('type') || 'event-created';
        const data = { id: Math.floor(Math.random() * 1000), ts: Date.now() };
        broadcast(type, data);
        res.statusCode = 200;
        res.end(
          JSON.stringify({
            ok: true,
            pushed: { type, data },
            subscriberCount: subscribers.size,
          }),
        );
      });

      // ---- Dev-only stats endpoint ----
      server.middlewares.use('/__dev__/sse-stats', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ subscribers: subscribers.size }));
      });
    },
  };
}
