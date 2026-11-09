const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processBrandAssets() {
  const rawLogoPath = 'C:/Users/matheus/.gemini/antigravity/brain/2abb83cd-dd6d-4510-ad34-69195f334782/.user_uploaded/media_1794194128437_7052fb25.png';
  const publicDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../app');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Loading raw logo from:', rawLogoPath);

  // Load raw image pixels
  const { data, info } = await sharp(rawLogoPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Find center of the circle by scanning cyan / outer ring bounds
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Check if it's the cyan ring: high blue & green, lower red
      if (a > 100 && b > 140 && g > 100 && r < 80) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const cx = Math.round((minX + maxX) / 2);
  const cy = Math.round((minY + maxY) / 2);
  const rx = (maxX - minX) / 2;
  const ry = (maxY - minY) / 2;
  const maxRadius = Math.max(rx, ry);

  console.log('Detected circle outer bounds:', { minX, maxX, minY, maxY, cx, cy, rx, ry, maxRadius });

  // Outer border radius with smooth anti-aliased falloff to remove checkerboard outside
  const cleanRadius = maxRadius + 3; // Keep outer stroke fully intact
  const feather = 1.5;

  const cleanData = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist >= cleanRadius + feather) {
        cleanData[idx + 3] = 0; // Fully transparent outside
      } else if (dist > cleanRadius - feather) {
        const factor = (cleanRadius + feather - dist) / (2 * feather);
        cleanData[idx + 3] = Math.round(cleanData[idx + 3] * Math.max(0, Math.min(1, factor)));
      }
    }
  }

  // Save the cleaned circular logo
  const cleanedBuffer = await sharp(cleanData, {
    raw: { width, height, channels: 4 }
  }).png().toBuffer();

  // Crop to a neat bounding box centered on circle
  const size = Math.round(cleanRadius * 2 + 10);
  const left = Math.max(0, Math.round(cx - size / 2));
  const top = Math.max(0, Math.round(cy - size / 2));
  const extractW = Math.min(width - left, size);
  const extractH = Math.min(height - top, size);

  const croppedBadge = await sharp(cleanedBuffer)
    .extract({ left, top, width: extractW, height: extractH })
    .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Save to public
  fs.writeFileSync(path.join(publicDir, 'logo.png'), croppedBadge);
  fs.writeFileSync(path.join(publicDir, 'logo-tubarao.png'), croppedBadge);
  fs.writeFileSync(path.join(publicDir, 'logo-circle.png'), croppedBadge);

  // App & public icons
  const icon512 = await sharp(croppedBadge).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon.png'), icon512);
  fs.writeFileSync(path.join(publicDir, 'icon-512x512.png'), icon512);
  fs.writeFileSync(path.join(appDir, 'icon.png'), icon512);

  const icon192 = await sharp(croppedBadge).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-192x192.png'), icon192);

  const icon48 = await sharp(croppedBadge).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-48x48.png'), icon48);

  const icon32 = await sharp(croppedBadge).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-32x32.png'), icon32);

  const icon16 = await sharp(croppedBadge).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-16x16.png'), icon16);

  // Favicon.ico
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icon32);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icon32);

  // Apple Touch Icon (180x180) with deep navy background for luxurious iOS appearance
  const appleBg = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 11, g: 19, b: 32, alpha: 1 } // #0B1320 deep navy
    }
  }).png().toBuffer();

  const appleLogoSymbol = await sharp(croppedBadge)
    .resize(144, 144, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const appleIcon = await sharp(appleBg)
    .composite([{ input: appleLogoSymbol, gravity: 'center' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), appleIcon);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleIcon);

  console.log('✅ All logo, icon, and favicon brand assets successfully created!');
}

processBrandAssets().catch(err => {
  console.error('Error processing brand assets:', err);
  process.exit(1);
});
