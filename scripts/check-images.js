const https = require('https');
const urls = [
  'https://source.unsplash.com/1200x800/?tokyo+shibuya+penthouse+exterior&sig=4601',
  'https://source.unsplash.com/1200x800/?beverly+hills+mansion&sig=3701',
  'https://source.unsplash.com/1200x800/?cape+town+sea+point+exterior&sig=4641',
  'https://images.unsplash.com/photo-1661362715810-74dbbd4b51a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
];

function check(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve({ url, statusCode: res.statusCode, headers: res.headers['content-type'] });
    });
    req.on('error', (err) => resolve({ url, error: err.message }));
    req.end();
  });
}

(async () => {
  for (const u of urls) {
    const r = await check(u);
    console.log(JSON.stringify(r));
    if (!r.statusCode || r.statusCode !== 200) {
      // Try picsum fallback
      const seed = encodeURIComponent(u).slice(0, 32)
      const fb = `https://picsum.photos/1200/800?random=${seed}`
      const fbResp = await check(fb)
      console.log('fallback:', JSON.stringify(fbResp))
    }
  }
})();