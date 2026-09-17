#!/usr/bin/env node
// sessrumnir — the seat-hall window. Launches the built Electron shell.
const { spawn } = require("node:child_process");
const path = require("node:path");
let electron;
try { electron = require("electron"); } catch { // not installed as a dep (dev mode) — resolve the local dev binary
  electron = path.join(__dirname, "..", "node_modules", ".bin", "electron");
}
const main = path.join(__dirname, "..", "out", "main", "index.js");
const child = spawn(electron, [main, ...process.argv.slice(2)], { stdio: "inherit", env: process.env });
child.on("exit", (code, signal) => process.exit(signal ? (signal === "SIGINT" ? 130 : 1) : (code ?? 0)));
