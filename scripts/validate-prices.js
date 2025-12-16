const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, '..', 'src', 'data', 'properties.ts');
const src = fs.readFileSync(srcPath, 'utf8');
const props = [];
const lines = src.split('\n');
let cur = null;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const mId = line.match(/^id:\s*'?([\w-]+)'?,?$/);
  if (mId) {
    if (cur) props.push(cur);
    cur = { id: mId[1], title: '', price: null };
    continue;
  }
  if (!cur) continue;
  const mTitle = line.match(/^title:\s*'(.+)',?$/);
  if (mTitle) cur.title = mTitle[1];
  const mPrice = line.match(/^price:\s*(\d+),?$/);
  if (mPrice) cur.price = Number(mPrice[1]);
}
if (cur) props.push(cur);

const issues = [];
props.forEach(p => {
  if (p.price === null) issues.push({ id: p.id, title: p.title, issue: 'missing price' });
  else if (p.price <= 10000) issues.push({ id: p.id, title: p.title, issue: `price unusually low (${p.price})` });
  else if (p.price > 100000000) issues.push({ id: p.id, title: p.title, issue: `price unusually high (${p.price})` });
});

console.log('Total properties checked:', props.length);
console.log('Issues found:', issues.length);
console.log('Sample issues (up to 50):', issues.slice(0,50));

fs.writeFileSync(path.join(__dirname, 'price-audit-report.json'), JSON.stringify({ props: props.length, issues }, null, 2));
console.log('Report saved to scripts/price-audit-report.json');
