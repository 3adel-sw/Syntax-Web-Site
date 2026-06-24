# Backend SSE Spec — Events Live Stream

> **Audience:** Backend team (Laravel/PHP).
> **Frontend owner:** Mavis.
> **Created:** 2026-06-24.
> **Status:** Required — frontend is already wired up and waiting.

---

## Why this exists

The SPA subscribes to a live event stream to invalidate the React Query cache
when a new event is created or an existing one is updated. Today the frontend
calls `GET /api/events` (JSON) and the browser aborts the `EventSource` because
the response is `application/json`, not `text/event-stream`. The fix is a
dedicated streaming endpoint on the backend.

The full chain:

```
User opens /events
  → useEffect fires getAllEvents() / getEventAbout() / getEventCategories()
  → Render
  → LayoutSyntax mounts → EventSource('/api/events/stream') opens
  → Backend pushes "event-created" → React Query refetches
```

---

## Endpoint

```
GET /api/events/stream
```

No path parameters. The frontend reads the current language from
`localStorage.getItem('lang')` and does not pass it to the stream — the stream
is language-agnostic (it's a signal, not content).

| Concern | Value |
|---|---|
| **Method** | `GET` |
| **Path** | `/api/events/stream` |
| **Auth** | None (matches existing public endpoints) |
| **CORS** | `Access-Control-Allow-Origin: *` (already set) |
| **Required response headers** | See below |
| **Response body** | SSE stream (see protocol) |

### Required response headers

```
Content-Type: text/event-stream
Cache-Control: no-cache, no-transform
Connection: keep-alive
X-Accel-Buffering: no        ← disable nginx buffering
```

`X-Accel-Buffering: no` is critical — without it, nginx buffers the response
and the browser never receives a single byte until the connection closes.

---

## SSE protocol

Send one or more events. Each event is a block of lines:

```
event: <event-name>
id: <optional-unique-id>
data: <json-payload>

(blank line terminator)
```

### Event types

| Event | When to fire | `data` payload |
|---|---|---|
| `event-created` | A new event is created (admin/CRUD) | `{ "id": 39, "lang": "ar" }` |
| `event-updated` | An event is updated | `{ "id": 39, "lang": "ar" }` |
| `ping` | Every 25 seconds | (no `data` line, or `data: {"ts":<unix>}`) |

### Format

```
event: event-created
data: {"id":39}

event: ping
data: {"ts":1764024000}

```

Note the blank line at the end of each event block — the browser splits on it.

---

## Keep-alive (required)

Most proxies (nginx, Cloudflare) close idle connections after 30–60s. To
prevent that, send a `ping` event every **25 seconds**:

```
event: ping
data: {"ts":1764024000}

```

If you can't implement pings, at minimum send a comment line every 25s:

```
: keep-alive

```

The browser ignores comments (lines starting with `:`) and treats the
connection as alive.

---

## Implementation sketch (Laravel)

```php
// routes/api.php
Route::get('/events/stream', [EventStreamController::class, 'stream']);
```

```php
// app/Http/Controllers/EventStreamController.php
namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\StreamedResponse;

class EventStreamController extends Controller
{
    public function stream(): StreamedResponse
    {
        $response = new StreamedResponse(function () {
            // Disable PHP output buffering
            @ob_end_flush();
            @ob_implicit_flush(true);

            // Disable nginx buffering
            header('X-Accel-Buffering: no');

            $lastPing = time();

            while (true) {
                // Check for new events via cache/redis/broadcast
                if (Redis::llen('events:new') > 0) {
                    $event = json_decode(Redis::lpop('events:new'));
                    echo "event: event-created\n";
                    echo "data: " . json_encode(['id' => $event->id]) . "\n\n";
                }

                // Heartbeat every 25s
                if (time() - $lastPing >= 25) {
                    echo ": keep-alive\n\n";
                    $lastPing = time();
                }

                flush();
                sleep(1);

                // Detect client disconnect
                if (connection_aborted()) {
                    return;
                }
            }
        });

        $response->headers->set('Content-Type', 'text/event-stream');
        $response->headers->set('Cache-Control', 'no-cache, no-transform');
        $response->headers->set('Connection', 'keep-alive');
        $response->headers->set('X-Accel-Buffering', 'no');

        return $response;
    }
}
```

When the admin creates/updates an event, push to Redis:

```php
// In the admin controller, after saving
Redis::rpush('events:new', json_encode($event));
```

> The above is a polling sketch. A cleaner long-term approach is Laravel
> Broadcasting (Reverb/Pusher) with a `private-events` channel. Polling works
> fine for low-traffic admin events.

---

## Frontend wiring (already done)

File: `src/components/layout/LayoutSyntax.jsx`

```js
const eventSource = new EventSource(
  `${import.meta.env.VITE_API_URL}/events/stream`
);

eventSource.addEventListener("event-created", () => {
  queryClient.invalidateQueries({ queryKey: ["events"] });
});

eventSource.addEventListener("event-updated", () => {
  queryClient.invalidateQueries({ queryKey: ["events"] });
});

eventSource.addEventListener("ping", () => {});
```

---

## Acceptance criteria

- [ ] `GET /api/events/stream` returns `Content-Type: text/event-stream`
- [ ] Response includes `X-Accel-Buffering: no` header
- [ ] When an event is created, the stream emits an `event-created` event
- [ ] `ping` event fires every 25 seconds
- [ ] Connection survives > 60s without disconnecting
- [ ] After implementing, frontend console shows **no** `EventSource` MIME
      type errors
- [ ] Frontend `/events` page refetches automatically within 1 second of a
      new event being created (in a separate browser tab)

---

## Curl test

```bash
curl -N -i \
  -H "Accept: text/event-stream" \
  https://back.mhwaralabtikar.com/api/events/stream
```

You should see the headers and then a `ping` line every 25s.

---

## Reference

- [MDN: Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [HTML Living Spec: Server-Sent Events](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- [Laravel: Streamed Responses](https://laravel.com/docs/responses#streamed-responses)

---

## Appendix: Vite dev plugin (already shipped)

While waiting for the backend, the dev experience is handled by a Vite plugin
in `tools/dev-sse-plugin.mjs` that mocks the stream locally. The frontend
detects `import.meta.env.DEV` and uses a relative URL (`/api/events/stream`)
which the Vite plugin intercepts.

### Behavior

| Endpoint | Method | Behavior |
|---|---|---|
| `/api/events/stream` | `GET` | Opens SSE stream, sends `: connected` immediately, then `ping` every 25s |
| `/__dev__/sse-test/push?type=<event>` | `POST` | Broadcasts an SSE event to all open streams (use this to test the full chain) |
| `/__dev__/sse-stats` | `GET` | Returns `{ "subscribers": <count> }` |

### How to test the full chain in dev

1. Open `http://localhost:5173/events` in browser A
2. From terminal, simulate a backend event:
   ```bash
   curl -X POST "http://localhost:5173/__dev__/sse-test/push?type=event-created"
   ```
3. Browser A's `queryClient.invalidateQueries({queryKey: ["events"]})` fires
   → the events list refetches in the background → DOM updates

### Dev plugin does NOT run in production

`apply: 'serve'` in `tools/dev-sse-plugin.mjs` restricts the plugin to
`vite dev`. Production builds (`vite build`) exclude it, so the production
bundle hits your real backend at `${VITE_API_URL}/events/stream`.
