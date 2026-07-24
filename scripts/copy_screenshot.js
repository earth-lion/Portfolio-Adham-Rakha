import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userProfile = process.env.USERPROFILE || process.env.HOME;
const srcDir = path.join(userProfile, '.gemini', 'antigravity', 'brain', '53d859c5-3b69-4e0c-add2-5eab94d98261');
const srcFile = path.join(srcDir, 'media__1784883507545.png');
const dest = path.join(__dirname, '..', 'src', 'assets', 'My Work', 'omniscale-ai.png');

try {
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, dest);
    console.log('SUCCESS: Screenshot copied to:', dest);
  } else {
    console.error('Source file not found at:', srcFile);
  }
} catch (err) {
  console.error('Error during copy:', err.message);
}
