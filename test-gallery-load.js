const https = require('https');

console.log('Testing gallery image loading simulation...');

// Simulate how the gallery loads images
const testImageLoad = (num) => {
  return new Promise((resolve) => {
    const url = `https://saeedghods-portfolio-assets.s3.us-east-2.amazonaws.com/assets/hydroponic/JPEG/${num}.jpg`;
    
    console.log(`Testing ${num}.jpg...`);
    
    const req = https.get(url, {
      headers: {
        'Origin': 'https://saeedghods.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      console.log(`  Status: ${res.statusCode}`);
      console.log(`  CORS: ${res.headers['access-control-allow-origin'] || 'NONE'}`);
      console.log(`  Content-Type: ${res.headers['content-type']}`);
      console.log('');
      resolve(res.statusCode === 200);
    }).on('error', (e) => {
      console.error(`  Error: ${e.message}`);
      console.log('');
      resolve(false);
    });
  });
};

(async () => {
  const problematicImages = ['11', '13', '14', '15', '16'];
  let successCount = 0;
  
  for (const num of problematicImages) {
    const success = await testImageLoad(num);
    if (success) successCount++;
  }
  
  console.log(`Results: ${successCount}/${problematicImages.length} images loaded successfully`);
  
  if (successCount === problematicImages.length) {
    console.log('✅ All images accessible - CORS configuration is working');
    console.log('💡 Issue might be browser cache or gallery loading mechanism');
  } else {
    console.log('❌ Some images still not accessible');
  }
})();
