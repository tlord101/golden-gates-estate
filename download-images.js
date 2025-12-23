const fs = require('fs');
const path = require('path');
const axios = require('axios');

const imageData = [
  // Properties (12)
  { name: 'properties/barcelona-penthouse-luxury.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/8258482460383164847_0' },
  { name: 'properties/barcelona-apartment-modern.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/1188330807337756177_0' },
  { name: 'properties/barcelona-villa-contemporary.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/327179253896848902_0' },
  { name: 'properties/barcelona-beach-penthouse.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/14589178584288653614_0' },
  { name: 'properties/barcelona-apartment-sarria.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/6573498262509475844_0' },
  { name: 'properties/barcelona-loft-poblenou.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/5780579423458531573_0' },
  { name: 'properties/barcelona-townhouse-gracia.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/17554846715852786821_0' },
  { name: 'properties/sitges-estate-luxury.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/6946012046915134961_0' },
  { name: 'properties/madrid-apartment-salamanca.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/2667793546093772287_0' },
  { name: 'properties/marbella-villa-beachfront.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/16750767562048413657_0' },
  { name: 'properties/valencia-penthouse-seafront.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/6129689889278930347_0' },
  { name: 'properties/ibiza-villa-luxury.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/11188808463271367179_0' },

  // Locations (22)
  { name: 'locations/barcelona-eixample.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/14147894169506379424_0' },
  { name: 'locations/barcelona-gracia.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/17635878479466056785_0' },
  { name: 'locations/barcelona-poblenou.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/16802923836633883553_0' },
  { name: 'locations/barcelona-sarria.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/1533198859905294753_0' },
  { name: 'locations/barcelona-gothic-quarter.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/601166735252628046_0' },
  { name: 'locations/sitges.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/2120179340487780733_0' },
  { name: 'locations/madrid-salamanca.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/7556376381883943563_0' },
  { name: 'locations/madrid-retiro.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/17174841080334062278_0' },
  { name: 'locations/madrid-chamber.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/4900204746859909513_0' },
  { name: 'locations/marbella-golden-mile.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/3154647221089648505_0' },
  { name: 'locations/marbella-puerto-banus.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/9293194147105622373_0' },
  { name: 'locations/valencia-city-of-arts.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/13676664809155703596_0' },
  { name: 'locations/valencia-beachfront.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/16219631047544591605_0' },
  { name: 'locations/ibiza-sunset.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/13542963550688801876_0' },
  { name: 'locations/palma-mallorca.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/14117477740616964340_0' },
  { name: 'locations/lisbon.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/17024547928639761019_0' },
  { name: 'locations/porto.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/4900204746859910854_0' },
  { name: 'locations/lagos.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/13657082520039531282_0' },
  { name: 'locations/cape-town.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/2620854167215729805_0' },
  { name: 'locations/dubai-marina.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/5293877100858939106_0' },
  { name: 'locations/singapore.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/4349892218491543308_0' },
  { name: 'locations/tokyo.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/4062402130966331005_0' },

  // Pages (8)
  { name: 'pages/hero-luxury.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/5831627127784866366_0' },
  { name: 'pages/about-global.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/2244977823198754395_0' },
  { name: 'pages/about-apartment.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/13542963550688801373_0' },
  { name: 'pages/installments.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/12518074160383766339_0' },
  { name: 'pages/why-choose-global.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/1361506742109147642_0' },
  { name: 'pages/why-choose-payment.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/7556376381883942431_0' },
  { name: 'pages/why-choose-support.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/1361506742109147642_0' },
  { name: 'pages/why-choose-secure.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/7556376381883942431_0' },

  // Testimonials (3)
  { name: 'testimonials/testimonial-1.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/14679381587727853760_0' },
  { name: 'testimonials/testimonial-2.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/3979161066480577496_0' },
  { name: 'testimonials/testimonial-3.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/12078303904485478088_0' },

  // Blog (6)
  { name: 'pages/blog-barcelona.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/14147894169506379424_0' },
  { name: 'pages/blog-marbella.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/3154647221089648505_0' },
  { name: 'pages/blog-madrid.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/7556376381883943563_0' },
  { name: 'pages/blog-modern-living.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/13542963550688801373_0' },
  { name: 'pages/blog-luxury-villa.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/11188808463271367179_0' },
  { name: 'pages/blog-penthouse.jpg', url: 'http://googleusercontent.com/image_collection/image_retrieval/8258482460383164847_0' }
];

async function downloadImage(url, filepath) {
  const directory = path.dirname(filepath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  try {
    const response = await axios({ url, method: 'GET', responseType: 'stream' });
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filepath);
      response.data.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (e) {
    throw new Error(`Connection error: ${e.message}`);
  }
}

async function startDownload() {
  console.log(`--- Starting Download of ${imageData.length} Assets ---`);
  for (let i = 0; i < imageData.length; i++) {
    const img = imageData[i];
    const fullPath = path.join(__dirname, 'public/images', img.name);
    try {
      await downloadImage(img.url, fullPath);
      console.log(`[${i + 1}/${imageData.length}] ✅ Success: ${img.name}`);
    } catch (error) {
      console.error(`[${i + 1}/${imageData.length}] ❌ Failed: ${img.name} - ${error.message}`);
    }
  }
  console.log('--- All downloads complete! ---');
}

startDownload();
