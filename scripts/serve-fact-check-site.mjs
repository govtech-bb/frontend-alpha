#!/usr/bin/env node
// Serve docs/fact-check/site/ on a local HTTP port and open it in a
// browser. Auto-rebuilds first if the site/ directory is missing.
//
// Usage: node scripts/serve-fact-check-site.mjs [--port=4321] [--no-open]
//        or: npm run fact-check:serve

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const SITE_DIR = path.join(REPO_ROOT, "docs", "fact-check", "site");

const args = process.argv.slice(2);
const portArg = args.find((a) => a.startsWith("--port="));
const PORT = portArg ? Number(portArg.split("=")[1]) : 4321;
const NO_OPEN = args.includes("--no-open");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

function ensureBuilt() {
  if (
    !(
      fs.existsSync(SITE_DIR) &&
      fs.existsSync(path.join(SITE_DIR, "index.html"))
    )
  ) {
    console.log("site/ not found — running build first…");
    const result = spawnSync(
      "node",
      [path.join(__dirname, "build-fact-check-site.mjs")],
      { stdio: "inherit" }
    );
    if (result.status !== 0) {
      console.error("Build failed.");
      process.exit(1);
    }
  }
}

function safeJoin(root, urlPath) {
  // Prevent path traversal.
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = path.posix.normalize(decoded).replace(/^(\.\.[/])+/, "");
  const target = path.join(root, normalized);
  if (!target.startsWith(root)) return null;
  return target;
}

function serve() {
  const server = createServer((req, res) => {
    const pathName = req.url === "/" ? "/index.html" : req.url;
    let filePath = safeJoin(SITE_DIR, pathName);
    if (!filePath) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    // If the URL has no extension and the .html version exists, serve that.
    // Lets "localhost:PORT/get-a-document-notarised" work.
    if (!path.extname(filePath) && fs.existsSync(`${filePath}.html`)) {
      filePath = `${filePath}.html`;
    }

    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          `<h1>404</h1><p>Not found: ${pathName}</p><p><a href="/">← back to dashboard</a></p>`
        );
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      fs.createReadStream(filePath).pipe(res);
    });
  });

  server.listen(PORT, "127.0.0.1", () => {
    const url = `http://127.0.0.1:${PORT}/`;
    console.log("\n  GovBB fact-check site");
    console.log(`  Serving ${path.relative(REPO_ROOT, SITE_DIR)}/`);
    console.log(`  → ${url}\n`);
    console.log("  Press Ctrl-C to stop.\n");
    if (!NO_OPEN) {
      const opener =
        process.platform === "darwin"
          ? "open"
          : process.platform === "win32"
            ? "start"
            : "xdg-open";
      spawnSync(opener, [url], { stdio: "ignore", detached: true });
    }
  });

  process.on("SIGINT", () => {
    console.log("\n  Stopping server.");
    server.close(() => process.exit(0));
  });
}

ensureBuilt();
serve();
