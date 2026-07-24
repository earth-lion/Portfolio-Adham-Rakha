const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\East-Sound\\.gemini\\antigravity\\brain\\53d859c5-3b69-4e0c-add2-5eab94d98261\\omniscale_ai_mockup_1784883302372.png';
const dest = path.join(__dirname, '..', 'src', 'assets', 'My Work', 'omniscale-ai.png');

try {
  fs.copyFileSync(src, dest);
  console.log('Mockup image copied successfully to:', dest);
} catch (err) {
  console.error('Error copying file:', err.message);
}
