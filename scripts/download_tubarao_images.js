const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// High-end bespoke furniture & architectural woodworking interior photos from Unsplash
const imagesToDownload = [
  // HERO SLIDES
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    dest: 'public/images/hero/hero-cozinha-luxo.jpg',
    width: 1600,
    height: 900
  },
  {
    url: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1600&q=85',
    dest: 'public/images/hero/hero-closet-master.jpg',
    width: 1600,
    height: 900
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    dest: 'public/images/hero/hero-sala-ripado.jpg',
    width: 1600,
    height: 900
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    dest: 'public/images/hero/hero-corporativo-luxo.jpg',
    width: 1600,
    height: 900
  },

  // PROJETOS / PORTFÓLIO
  // 1. Cozinhas
  {
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/projetos/cozinha-planejada-moderna.jpg',
    width: 1200,
    height: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/projetos/cozinha-ilha-gourmet.jpg',
    width: 1200,
    height: 800
  },
  // 2. Dormitórios e Closets
  {
    url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/projetos/closet-planejado-luxo.jpg',
    width: 1200,
    height: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/projetos/dormitorio-suite-master.jpg',
    width: 1200,
    height: 800
  },
  // 3. Salas e Home Theaters
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/projetos/painel-ripado-home-theater.jpg',
    width: 1200,
    height: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/projetos/estante-iluminada-living.jpg',
    width: 1200,
    height: 800
  },
  // 4. Banheiros Nobres
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/projetos/banheiro-gabinete-flutuante.jpg',
    width: 1200,
    height: 800
  },
  // 5. Ambientes Comerciais & Corporativos
  {
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/projetos/escritorio-corporativo-executivo.jpg',
    width: 1200,
    height: 800
  },
  // 6. Madeira Maciça & Projetos Especiais (Tradição 1977)
  {
    url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/projetos/porta-pivotante-madeira-macica.jpg',
    width: 1200,
    height: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/projetos/adega-cristaleira-planejada.jpg',
    width: 1200,
    height: 800
  },

  // DETALHES DE ACABAMENTO & PROCESSOS
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/detalhes/marcenaria-artesanal-precisao.jpg',
    width: 800,
    height: 600
  },
  {
    url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/detalhes/ferragens-e-acabamento.jpg',
    width: 800,
    height: 600
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/detalhes/materiais-nobres-mdf.jpg',
    width: 800,
    height: 600
  },
  {
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/detalhes/projeto-3d-arquitetura.jpg',
    width: 800,
    height: 600
  }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

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

async function run() {
  console.log(`Starting download and optimization of ${imagesToDownload.length} images...`);
  for (const item of imagesToDownload) {
    const fullPath = path.join(__dirname, '..', item.dest);
    const tempPath = fullPath + '.tmp';
    try {
      console.log(`Downloading: ${item.dest}...`);
      await downloadFile(item.url, tempPath);
      // Optimize with sharp
      await sharp(tempPath)
        .resize(item.width, item.height, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 84, progressive: true })
        .toFile(fullPath);
      fs.unlinkSync(tempPath);
      console.log(`  ✓ Saved: ${item.dest}`);
    } catch (err) {
      console.error(`  ✗ Error with ${item.dest}:`, err.message);
    }
  }
  console.log('Finished downloading curated marcenaria photography!');
}

run();
