// Image compression script using sharp (ES Module)
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '../src/assets');

const tasks = [
  {
    input: path.join(assetsDir, 'My Work/Bistro Bliss.png'),
    output: path.join(assetsDir, 'My Work/bistro-bliss.webp'),
    width: 900, quality: 82,
  },
  {
    input: path.join(assetsDir, 'My Work/smart student portal.png'),
    output: path.join(assetsDir, 'My Work/smart student portal.webp'),
    width: 900, quality: 82,
  },
  {
    input: path.join(assetsDir, 'My Work/LOGIN.png'),
    output: path.join(assetsDir, 'My Work/login.webp'),
    width: 900, quality: 82,
  },
  {
    input: path.join(assetsDir, 'My Work/portfolio.png'),
    output: path.join(assetsDir, 'My Work/portfolio.webp'),
    width: 900, quality: 82,
  },
  {
    input: path.join(assetsDir, 'hero.png'),
    output: path.join(assetsDir, 'hero.webp'),
    width: 600, quality: 85,
  },
  {
    input: path.join(assetsDir, 'logo.png'),
    output: path.join(assetsDir, 'logo.webp'),
    width: 200, quality: 90,
  },
];

async function run() {
  for (const t of tasks) {
    const before = fs.statSync(t.input).size;
    await sharp(t.input)
      .resize({ width: t.width, withoutEnlargement: true })
      .webp({ quality: t.quality })
      .toFile(t.output);
    const after = fs.statSync(t.output).size;
    const saved = (((before - after) / before) * 100).toFixed(1);
    console.log(`✅ ${path.basename(t.output)} → ${(after/1024).toFixed(0)} KB  (saved ${saved}%)`);
  }
  console.log('\n🎉 All images compressed!');
}

run().catch(console.error);
