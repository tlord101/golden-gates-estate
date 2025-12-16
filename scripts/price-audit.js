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
    cur = { id: mId[1], city: '', title: '', price: 0, bedrooms: 0 };
    continue;
  }
  if (!cur) continue;
  const mCity = line.match(/^city:\s*'(.+)',?$/);
  if (mCity) cur.city = mCity[1];
  const mTitle = line.match(/^title:\s*'(.+)',?$/);
  if (mTitle) cur.title = mTitle[1];
  const mPrice = line.match(/^price:\s*(\d+),?$/);
  if (mPrice) cur.price = Number(mPrice[1]);
  const mBeds = line.match(/^bedrooms:\s*(\d+),?$/);
  if (mBeds) cur.bedrooms = Number(mBeds[1]);
}
if (cur) props.push(cur);

const issues = props.filter(p => p.bedrooms <= 1 && p.price > 250000);
console.log('1-bed properties priced over €250k (check for accuracy):', issues);

// write report
fs.writeFileSync(path.join(__dirname,'price-audit-report.json'), JSON.stringify({ issues, total: props.length }, null, 2));
console.log('Report written to scripts/price-audit-report.json');
