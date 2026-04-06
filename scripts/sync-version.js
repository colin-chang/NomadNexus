#!/usr/bin/env node
/**
 * Syncs the version from package.json into src/start/_index.scss.
 * Runs automatically via the npm "version" lifecycle hook.
 */

const fs = require('fs');
const path = require('path');

const { version } = require('../package.json');
const indexPath = path.resolve(__dirname, '../src/start/_index.scss');

const content = fs.readFileSync(indexPath, 'utf8');
const updated = content.replace(/(\$version:\s*')[^']*(')/,  `$1${version}$2`);

if (content === updated) {
  console.warn('sync-version: $version pattern not found in _index.scss');
  process.exit(1);
}

fs.writeFileSync(indexPath, updated, 'utf8');
console.log(`sync-version: updated $version to '${version}' in src/start/_index.scss`);
