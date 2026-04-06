#!/usr/bin/env node
/**
 * One-time script: prepend SPDX copyright headers to all SCSS source files.
 * Run with: node scripts/add-headers.js
 * Safe to re-run — skips files that already have the header.
 */

const fs = require('fs');
const path = require('path');

// Files entirely new to NomadNexus (no ClearVision v7 equivalent)
const NOMADNEXUS_ORIGINAL_DIRS = [
  'src/betterdiscord-theme',
  'src/vencord-theme',
];

const HEADER_DERIVED =
  '// SPDX-License-Identifier: Apache-2.0\n' +
  '// Copyright 2026 Colin Chang. Based on ClearVision v7 by ClearVision Team (Apache-2.0).\n';

const HEADER_ORIGINAL =
  '// SPDX-License-Identifier: Apache-2.0\n' +
  '// Copyright 2026 Colin Chang\n';

const MARKER = 'SPDX-License-Identifier';

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else if (entry.name.endsWith('.scss')) results.push(full);
  }
  return results;
}

function isOriginal(filePath) {
  const rel = filePath.replace(/\\/g, '/');
  return NOMADNEXUS_ORIGINAL_DIRS.some(d => rel.includes(d));
}

const root = path.resolve(__dirname, '..');
const dirs = ['src', 'templates'].map(d => path.join(root, d));
const files = dirs.flatMap(d => walk(d));

let added = 0, skipped = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes(MARKER)) { skipped++; continue; }

  const header = isOriginal(file) ? HEADER_ORIGINAL : HEADER_DERIVED;
  fs.writeFileSync(file, header + content, 'utf8');
  added++;
  console.log(`  + ${path.relative(root, file)}`);
}

console.log(`\nDone: ${added} headers added, ${skipped} already present.`);
