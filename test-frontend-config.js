const axios = require('axios');

async function testFrontendConfig() {
  console.log('🔍 Testing frontend configuration...\n');

  // Test different possible API URLs
  const possibleUrls = [
    'https://swapskills-backend.onrender.com',
    'http://localhost:5002',
    'https://swapskills-backend.onrender.com/',
    'https://swapskills-backend.onrender.com/api'
  ];

  for (const url of possibleUrls) {
    try {
      console.log(`Testing: ${url}`);
      const response = await axios.get(`${url}/api/health`, { timeout: 5000 });
      console.log(`✅ ${url} - Working:`, response.data);
    } catch (error) {
      console.log(`❌ ${url} - Failed:`, error.message);
    }
  }

  console.log('\n📋 Frontend should use: https://swapskills-backend.onrender.com');
  console.log('💡 Make sure REACT_APP_API_URL is set in Vercel environment variables');
}

testFrontendConfig(); 