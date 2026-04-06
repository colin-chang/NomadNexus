#!/usr/bin/env node
/**
 * Syncs the version from package.json into src/start/_index.scss and README files.
 * Runs automatically via the npm "version" lifecycle hook.
 *
 * Usage:
 *   npm run version             — sync version from package.json to other files
 *   npm run version -- x.x.x   — set version in package.json and sync to other files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const pkgPath = path.resolve(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const arg = process.argv[2];
const stagedFiles = ['src/start/_index.scss', 'README.md', 'README.zh-CN.md'];
let version;

if (arg) {
  if (!/^\d+\.\d+\.\d+$/.test(arg)) {
    console.error(`sync-version: invalid version '${arg}', expected x.x.x`);
    process.exit(1);
  }
  version = arg;
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  console.log(`sync-version: updated version to '${version}' in package.json`);
  stagedFiles.push('package.json');
} else {
  version = pkg.version;
}

// 更新 _index.scss 中的 $version
const indexPath = path.resolve(root, 'src/start/_index.scss');
const indexContent = fs.readFileSync(indexPath, 'utf8');
const indexPattern = /(\$version:\s*')[^']*(')/;

if (!indexPattern.test(indexContent)) {
  console.warn('sync-version: $version pattern not found in _index.scss');
  process.exit(1);
}

const indexUpdated = indexContent.replace(indexPattern, `$1${version}$2`);
if (indexContent !== indexUpdated) {
  fs.writeFileSync(indexPath, indexUpdated, 'utf8');
  console.log(`sync-version: updated $version to '${version}' in src/start/_index.scss`);
}

// 更新 README 中的 jsDelivr CDN 版本号
const cdnPattern = /(cdn\.jsdelivr\.net\/gh\/colin-chang\/NomadNexus@)\d+\.\d+\.\d+/g;
for (const file of ['README.md', 'README.zh-CN.md']) {
  const filePath = path.resolve(root, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const updated = content.replace(cdnPattern, `$1${version}`);
  if (content !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`sync-version: updated CDN version to '${version}' in ${file}`);
  }
}

// 将所有修改的文件加入暂存区
execSync(`git add ${stagedFiles.join(' ')}`, { cwd: root });
