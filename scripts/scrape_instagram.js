const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
  hostname: 'www.instagram.com',
  path: '/marcenaria.tubarao/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync(path.join(__dirname, 'instagram_dump.html'), data);
    console.log('Saved instagram_dump.html, length:', data.length);

    // Extract all cdn URLs
    const regex = /https:\/\/[^"'\s\\]+cdninstagram\.com\/[^"'\s\\]+/g;
    const matches = data.match(regex) || [];
    const cleaned = matches.map(u => u.replace(/\\u0026/g, '&').replace(/\\/g, ''));
    const unique = Array.from(new Set(cleaned));
    console.log('Found unique cdninstagram links:', unique.length);
    unique.forEach((u, i) => console.log(`${i}: ${u.substring(0, 100)}...`));
  });
}).on('error', (err) => console.error('Error fetching Instagram:', err.message));
