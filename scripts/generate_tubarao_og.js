const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Status ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(destPath));
      });
    });
    req.on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function fixWineCellarAndOG() {
  const dest = path.join(__dirname, '../public/images/projetos/adega-cristaleira-planejada.jpg');
  const temp = dest + '.tmp';
  // High-res luxury bar / wine / dining cabinetry
  const wineUrl = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85';
  
  await downloadFile(wineUrl, temp);
  await sharp(temp)
    .resize(1200, 800, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, progressive: true })
    .toFile(dest);
  fs.unlinkSync(temp);
  console.log('✓ Saved replacement for adega-cristaleira-planejada.jpg');

  // Now create high-converting OG Image: 1200x630
  // Background: hero kitchen photo darkened with deep navy gradient overlay
  // Badge: Marcenaria Tubarão logo + text "Desde 1977 · Móveis Sob Medida · Belo Horizonte" + "5.0 ★ Google Reviews"
  const heroKitchenPath = path.join(__dirname, '../public/images/hero/hero-cozinha-luxo.jpg');
  const logoPath = path.join(__dirname, '../public/logo.png');
  const ogDest = path.join(__dirname, '../public/og-image.jpg');

  const bgBuffer = await sharp(heroKitchenPath)
    .resize(1200, 630, { fit: 'cover' })
    .toBuffer();

  const logoSmall = await sharp(logoPath)
    .resize(170, 170)
    .png()
    .toBuffer();

  const svgOverlay = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0B1320" stop-opacity="0.94" />
          <stop offset="55%" stop-color="#0F172A" stop-opacity="0.88" />
          <stop offset="100%" stop-color="#0284C7" stop-opacity="0.75" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#ogGrad)" />
      
      <!-- Cyan Accent Line -->
      <line x1="80" y1="40" x2="240" y2="40" stroke="#00B4D8" stroke-width="4" stroke-linecap="round" />
      
      <!-- Text Badge -->
      <rect x="80" y="55" width="230" height="36" rx="18" fill="#00B4D8" fill-opacity="0.15" stroke="#00B4D8" stroke-width="1.5" />
      <text x="96" y="79" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#38BDF8" letter-spacing="1.5">⭐ 5.0 GOOGLE REVIEWS</text>
      
      <!-- Headings -->
      <text x="80" y="270" font-family="'Montserrat', sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" letter-spacing="0.5">MARCENARIA DE ALTO PADRÃO</text>
      <text x="80" y="325" font-family="'Montserrat', sans-serif" font-weight="900" font-size="44" fill="#00B4D8" letter-spacing="1">&amp; MÓVEIS SOB MEDIDA EM BH</text>
      
      <!-- Slogan -->
      <text x="80" y="380" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="24" fill="#E2E8F0">Desde 1977 realizando sonhos com acabamento impecável.</text>
      
      <!-- Pills -->
      <g transform="translate(80, 420)">
        <text x="0" y="30" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="18" fill="#94A3B8">✓ 47+ Anos de Tradição</text>
        <text x="240" y="30" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="18" fill="#94A3B8">✓ Entrega Rigorosamente no Prazo</text>
        <text x="590" y="30" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="18" fill="#94A3B8">✓ Projetos 100% Personalizados</text>
      </g>
      
      <!-- Contact Footer -->
      <g transform="translate(80, 550)">
        <rect x="0" y="0" width="360" height="48" rx="8" fill="#16A34A" />
        <text x="24" y="31" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#FFFFFF">WhatsApp: (31) 99767-3576</text>
        <text x="390" y="31" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="16" fill="#CBD5E1">Rua Santa Judite, 70 · Bairro Aparecida · BH</text>
      </g>
    </svg>
  `;

  await sharp(bgBuffer)
    .composite([
      { input: Buffer.from(svgOverlay), left: 0, top: 0 },
      { input: logoSmall, left: 960, top: 60 }
    ])
    .jpeg({ quality: 88 })
    .toFile(ogDest);

  console.log('✓ Created og-image.jpg successfully!');
}

fixWineCellarAndOG().catch(console.error);
