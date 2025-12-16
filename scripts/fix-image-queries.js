const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, '..', 'src', 'data', 'properties.ts');
const src = fs.readFileSync(srcPath, 'utf8');
const lines = src.split('\n');
let out = [];
let cur = null;
let modified = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  out.push(line);
}

// Simple regexp replace: find exteriorImage/kitchenImage/bathroomImage lines and ensure the city is in the query
const propSrc = src;
const propRegex = /(id:\s*'(?<id>\d+)'[\s\S]*?)(?=id:\s*'|\]$)/g;
let m;
while ((m = propRegex.exec(propSrc)) !== null) {
  const block = m[0];
  const idMatch = block.match(/id:\s*'(?<id>\d+)'/);
  const id = idMatch ? idMatch.groups.id : 'unknown';
  const cityMatch = block.match(/city:\s*'(?<city>[^']+)'/);
  const city = cityMatch ? cityMatch.groups.city : '';

  ['exteriorImage','kitchenImage','bathroomImage'].forEach(key => {
    const re = new RegExp(`${key}:\s*'(?<url>[^']+)'`);
    const match = block.match(re);
    if (!match) return;
    let url = match.groups.url;
    const urlLower = url.toLowerCase();
    const cityNormalized = city.toLowerCase().replace(/\s+/g,'');
    if (city && !urlLower.includes(cityNormalized)) {
      // try to insert the city into the query part before &sig
      const parts = url.split('&sig=');
      const sig = parts[1] || id;
      let q = parts[0];
      // replace + with space-friendly insertion
      if (q.includes('?/')) {
        q = q.replace('?/', `?/${encodeURIComponent(city + '+')}`);
      } else {
        q = q.replace('?', `?/${encodeURIComponent(city + '+')}`);
      }
      const newUrl = `${q}&sig=${id}${sig ? ('-' + sig) : ''}`;
      const newLine = `${key}: '${newUrl}',`;
      const oldLineRegex = new RegExp(`${key}:\s*'[^']+',`);
      const newBlock = block.replace(oldLineRegex, newLine);
      if (newBlock !== block) {
        modified.push({ id, key, old: (match[0]), new: newLine });
      }
    }
  });
}

if (modified.length === 0) {
  console.log('No changes necessary');
  process.exit(0);
}

console.log('Dry run changes (sample up to 50):');
console.log(modified.slice(0,50));

// For safety we don't auto-write by default. To apply changes, run with --apply flag
if (process.argv.includes('--apply')) {
  let newSrc = src;
  modified.forEach(m => {
    newSrc = newSrc.replace(m.old, m.new);
  });
  fs.writeFileSync(srcPath, newSrc, 'utf8');
  console.log(`Applied ${modified.length} changes to ${srcPath}`);
} else {
  console.log('\nRun with `node scripts/fix-image-queries.js --apply` to apply the suggested changes.');
}
