// scripts/generate-static-snapshots.js
import { chromium } from 'playwright';
import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'path';
import { spawn } from 'child_process';

const NEXT_PORT = 3000;
const SNAPSHOT_DIR = path.resolve('public/snapshots');
const routerNmae = process.env.DOCS_ROUTER_NAME || 'docs';
/**
 * 扫描 content 下所有 md/mdx 文件并转成路由路径
 */
async function getAllContentRoutes() {
  const files = await glob('content/**/*.{md,mdx}');
  const routes = files.map((file) => {
    const relative = file.replace(/^content[\\/]/, '').replace(/\.(md|mdx)$/, '');
    const clean = relative.replace(/\\/g, '/'); // 兼容 Windows 
    const cleans = clean.split('/')
    return '/' + cleans[0]+`/${routerNmae}/`+cleans[1]; // => /zh/docs/index
  });
  return routes;
}

/**
 * 启动 Next.js 服务器（跨平台）
 */
async function startNext() {
  console.log('🚀 Starting Next.js server...');
  const nextProcess = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  // 等待服务器启动
  await new Promise((resolve) => setTimeout(resolve, 7000));
  return nextProcess;
}

/**
 * 生成静态快照
 */
async function generateSnapshots() {
  const routes = await getAllContentRoutes();


  await fs.ensureDir(SNAPSHOT_DIR);
  const nextProcess = await startNext();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const route of routes) {
    const url = `http://localhost:${NEXT_PORT}${route}`;
    console.log(`📸 Visiting: ${url}`);

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      if (!response?.ok()) throw new Error(`Bad response: ${response?.status()}`);

      const html = await page.content();
      const outFile = path.join(SNAPSHOT_DIR, `${route.replace(/^\//, '') || 'index'}.html`);
      await fs.outputFile(outFile, html);
      console.log(`✅ Snapshot saved: ${outFile}`);
    } catch (err) {
      console.error(`❌ Failed: ${url}`, err.message);
    }
  }

  await browser.close();
  nextProcess.kill();
  console.log('🧩 Done! Server closed.');
}

generateSnapshots().catch(console.error);
