const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const dumpPath = path.join(__dirname, 'instagram_dump.html');
const content = fs.readFileSync(dumpPath, 'utf8');

// Regex for scontent image links
const regex = /https:\/\/[^"'\s\\]*scontent[^"'\s\\]*cdninstagram\.com\/[^"'\s\\]+/g;
const matches = content.match(regex) || [];
const cleaned = matches.map(u => u.replace(/\\u0026/g, '&').replace(/\\/g, ''));
const unique = Array.from(new Set(cleaned));

console.log('Found', unique.length, 'scontent photo links');

const instagramDir = path.join(__dirname, '../public/images/instagram');
if (!fs.existsSync(instagramDir)) {
  fs.mkdirSync(instagramDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    });
    req.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  let count = 0;
  for (let i = 0; i < unique.length; i++) {
    const url = unique[i];
    // Ignore profile picture 150x150 if it's the avatar
    if (url.includes('189540021_1413790259001270')) {
      console.log('Skipping avatar thumbnail');
      continue;
    }
    const filename = `insta_post_${count + 1}.jpg`;
    const tempDest = path.join(instagramDir, `temp_${filename}`);
    const finalDest = path.join(instagramDir, filename);

    try {
      console.log(`Downloading (${i + 1}/${unique.length}): ${filename}...`);
      await download(url, tempDest);
      const meta = await sharp(tempDest).metadata();
      console.log(`  Size: ${meta.width}x${meta.height}, format: ${meta.format}`);
      
      // If valid image and reasonable size (> 200px)
      if (meta.width >= 200 && meta.height >= 200) {
        await sharp(tempDest)
          .jpeg({ quality: 88, progressive: true })
          .toFile(finalDest);
        count++;
        console.log(`  ✓ Saved as ${filename}`);
      }
      fs.unlinkSync(tempDest);
    } catch (e) {
      console.error(`  ✗ Error downloading:`, e.message);
      if (fs.existsSync(tempDest)) fs.unlinkSync(tempDest);
    }
  }

  console.log(`🎉 Successfully downloaded and processed ${count} real Instagram photos from Marcenaria Tubarão!`);
}

run();
