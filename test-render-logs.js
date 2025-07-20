const axios = require('axios');

async function checkRenderStatus() {
  console.log('🔍 Checking Render deployment status...\n');

  try {
    // Test 1: Health endpoint
    console.log('1️⃣ Health Check:');
    const healthResponse = await axios.get('https://swapskills-backend.onrender.com/api/health');
    console.log('✅ Health:', healthResponse.data);

    // Test 2: Environment check
    console.log('\n2️⃣ Environment Check:');
    const envResponse = await axios.get('https://swapskills-backend.onrender.com/api/env-check');
    console.log('✅ Environment:', JSON.stringify(envResponse.data, null, 2));

    // Test 3: Test endpoint
    console.log('\n3️⃣ Test Endpoint:');
    const testResponse = await axios.post('https://swapskills-backend.onrender.com/api/test', {
      test: 'connection',
      timestamp: Date.now()
    });
    console.log('✅ Test:', testResponse.data);

  } catch (error) {
    console.log('❌ Error:', error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

checkRenderStatus(); 