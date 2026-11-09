const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createHorizontalLogo() {
  const publicDir = path.join(__dirname, '../public');
  const emblemPath = path.join(publicDir, 'logo.png');

  // SVG lockup with vector typography matching the brand
  // Font: Heavy condensed bold sans-serif with high contrast
  const width = 800;
  const height = 180;
  const emblemSize = 150;

  const emblemBuffer = await sharp(emblemPath)
    .resize(emblemSize, emblemSize)
    .png()
    .toBuffer();

  const svgText = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00AEEF" />
          <stop offset="100%" stop-color="#00C4EE" />
        </linearGradient>
      </defs>
      <!-- Texts -->
      <g transform="translate(170, 0)">
        <text x="0" y="65" font-family="'Montserrat', 'Arial Black', sans-serif" font-weight="900" font-size="46" fill="#0B1320" letter-spacing="2">MARCENARIA</text>
        <text x="0" y="125" font-family="'Montserrat', 'Arial Black', sans-serif" font-weight="900" font-size="52" fill="url(#cyanGrad)" letter-spacing="3">TUBARÃO</text>
        <text x="3" y="155" font-family="'Plus Jakarta Sans', 'Arial', sans-serif" font-weight="700" font-size="14" fill="#64748B" letter-spacing="4">MÓVEIS PLANEJADOS · DESDE 1977</text>
      </g>
    </svg>
  `;

  // Composite emblem + SVG text for light backgrounds
  const horizontalLight = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: emblemBuffer, left: 10, top: 15 },
      { input: Buffer.from(svgText), left: 0, top: 0 }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'logo-horizontal.png'), horizontalLight);

  // Also create a version for dark headers (where "MARCENARIA" is White #FFFFFF)
  const svgTextDark = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyanGradDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00B4D8" />
          <stop offset="100%" stop-color="#38BDF8" />
        </linearGradient>
      </defs>
      <!-- Texts -->
      <g transform="translate(170, 0)">
        <text x="0" y="65" font-family="'Montserrat', 'Arial Black', sans-serif" font-weight="900" font-size="46" fill="#FFFFFF" letter-spacing="2">MARCENARIA</text>
        <text x="0" y="125" font-family="'Montserrat', 'Arial Black', sans-serif" font-weight="900" font-size="52" fill="url(#cyanGradDark)" letter-spacing="3">TUBARÃO</text>
        <text x="3" y="155" font-family="'Plus Jakarta Sans', 'Arial', sans-serif" font-weight="700" font-size="14" fill="#94A3B8" letter-spacing="4">MÓVEIS PLANEJADOS · DESDE 1977</text>
      </g>
    </svg>
  `;

  const horizontalDark = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: emblemBuffer, left: 10, top: 15 },
      { input: Buffer.from(svgTextDark), left: 0, top: 0 }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'logo-horizontal-dark.png'), horizontalDark);
  console.log('✅ Horizontal logos created successfully!');
}

createHorizontalLogo().catch(console.error);
