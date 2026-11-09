import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";
import { createSecurity } from "../dist/index.js";
import { extractClientIp } from "../dist/request.js";

test("uses the connection IP instead of caller-controlled forwarding headers", () => {
  assert.equal(
    extractClientIp({
      headers: { "x-forwarded-for": "203.0.113.8", "x-real-ip": "203.0.113.9" },
      remoteAddress: "192.0.2.4",
    }),
    "192.0.2.4",
  );
  assert.equal(
    extractClientIp({ headers: { "x-forwarded-for": "203.0.113.8" } }),
    "unknown",
  );
});

test("rejects malformed allowed origins during configuration", () => {
  assert.throws(
    () => createSecurity({ allowedOrigins: ["not a URL"] }),
    /Invalid allowedOrigins entry/,
  );
});

test("enforces global rate limiting before dispatching bare Node requests", async () => {
  const server = new EventEmitter();
  const security = createSecurity({
    rateLimit: { global: { max: 1, windowMs: 60_000 } },
  });
  security.install(server);

  let dispatched = 0;
  server.on("request", () => dispatched++);

  const request = () => new Promise<{ status: number; headers: Map<string, string> }>((resolve) => {
    const dispatchedBefore = dispatched;
    const headers = new Map<string, string>();
    const response = {
      setHeader: (name: string, value: string) => headers.set(name, value),
      writeHead: (status: number) => resolve({ status, headers }),
      end: () => {},
    };
    server.emit("request", {
      method: "GET",
      url: "/",
      headers: { "x-forwarded-for": "198.51.100.99" },
      socket: { remoteAddress: "192.0.2.20" },
    }, response);
    setTimeout(() => {
      if (dispatched > dispatchedBefore) resolve({ status: 200, headers });
    });
  });

  const first = await request();
  const second = await request();
  assert.equal(first.status, 200);
  assert.equal(second.status, 429);
  assert.equal(dispatched, 1);
});