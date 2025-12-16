const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'properties.ts'), 'utf8');
const props = [];
const lines = src.split('\n');
let cur = null;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const mId = line.match(/^id:\s*'?(\d+)'?,?$/);
  if (mId) {
    if (cur) props.push(cur);
    cur = { id: mId[1], city: '', title: '', exteriorImage: '', kitchenImage: '', bathroomImage: '' };
    continue;
  }
  if (!cur) continue;
  const mCity = line.match(/^city:\s*'(.+)',?$/);
  if (mCity) cur.city = mCity[1];
  const mTitle = line.match(/^title:\s*'(.+)',?$/);
  if (mTitle) cur.title = mTitle[1];
  const mExt = line.match(/^exteriorImage:\s*'(.+)',?$/);
  if (mExt) cur.exteriorImage = mExt[1];
  const mKit = line.match(/^kitchenImage:\s*'(.+)',?$/);
  if (mKit) cur.kitchenImage = mKit[1];
  const mBath = line.match(/^bathroomImage:\s*'(.+)',?$/);
  if (mBath) cur.bathroomImage = mBath[1];
}
if (cur) props.push(cur);

const duplicates = {};
const issues = [];
const urlSet = new Map();
props.forEach(p => {
  ['exteriorImage','kitchenImage','bathroomImage'].forEach(k => {
    const url = p[k];
    if (!url) { issues.push({id: p.id, issue: `${k} missing`}); return }
    if (urlSet.has(url)) {
      const prev = urlSet.get(url);
      duplicates[url] = duplicates[url] || [];
      duplicates[url].push(p.id);
      duplicates[url].push(prev);
    } else {
      urlSet.set(url, p.id);
    }
    // check city presence
    const city = p.city.toLowerCase().replace(/\s+/g,'');
    const urlLower = url.toLowerCase();
    if (city && !urlLower.includes(city) && !urlLower.includes(p.title.toLowerCase().split(' ')[0])) {
      issues.push({ id: p.id, issue: `${k} may not match city (${p.city})`, url });
    }
  })
});

console.log('Total properties:', props.length);
console.log('Duplicate image URLs found:', Object.keys(duplicates).length);
console.log('Sample duplicates (up to 10):', Object.entries(duplicates).slice(0,10));
console.log('Issues (sample up to 20):', issues.slice(0,20));

// Write report
fs.writeFileSync(path.join(__dirname,'image-audit-report.json'), JSON.stringify({ props: props.length, duplicates, issues }, null, 2));
console.log('Report written to scripts/image-audit-report.json');