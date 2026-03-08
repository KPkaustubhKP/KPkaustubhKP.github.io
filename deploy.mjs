/**
 * deploy.mjs
 *
 * Copies the Vite build output (dist/) into the repo root so GitHub Pages
 * can serve it directly from the main branch.
 *
 * What it does:
 *   1. Removes old /assets folder from root
 *   2. Copies dist/index.html  → ./index.html      (replaces the source one)
 *   3. Copies dist/assets/     → ./assets/          (hashed JS/CSS)
 *   4. Copies dist/*.pdf etc   → ./
 *   5. git add → commit → push
 *
 * Run via:  npm run deploy
 */

import { execSync }                   from 'child_process';
import { cpSync, rmSync, existsSync } from 'fs';
import { resolve, join }              from 'path';

const root     = resolve('.');
const dist     = join(root, 'dist');
const assets   = join(root, 'assets');

// ── 1. Remove old assets at root ────────────────────────────
if (existsSync(assets)) {
  console.log('🗑  Removing old /assets...');
  rmSync(assets, { recursive: true, force: true });
}

// ── 2. Copy dist/index.html → root ──────────────────────────
console.log('📄  Copying index.html...');
cpSync(join(dist, 'index.html'), join(root, 'index.html'));

// ── 3. Copy dist/assets → root/assets ───────────────────────
console.log('📦  Copying assets/...');
cpSync(join(dist, 'assets'), assets, { recursive: true });

// ── 4. Git commit + push ─────────────────────────────────────
const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
const msg       = `deploy: ${timestamp}`;

console.log(`\n🚀  Committing and pushing — "${msg}"`);
execSync('git add index.html assets/', { stdio: 'inherit' });
execSync(`git commit -m "${msg}" --allow-empty`, { stdio: 'inherit' });
execSync('git push origin main', { stdio: 'inherit' });

console.log('\n✅  Deployed! GitHub Pages will update in ~30 seconds.');
console.log('    → https://kpkaustubhkp.github.io\n');
