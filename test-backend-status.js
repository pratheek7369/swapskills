const axios = require('axios');

async function checkBackendStatus() {
  console.log('🔍 Comprehensive Backend Status Check...\n');

  try {
    // Test 1: Health endpoint
    console.log('1️⃣ Health Check:');
    const healthResponse = await axios.get('https://swapskills-backend.onrender.com/api/health');
    console.log('✅ Health:', healthResponse.data);

    // Test 2: Environment check
    console.log('\n2️⃣ Environment Check:');
    const envResponse = await axios.get('https://swapskills-backend.onrender.com/api/env-check');
    console.log('✅ Environment:', envResponse.data);

    // Test 3: Test endpoint
    console.log('\n3️⃣ Test Endpoint:');
    const testResponse = await axios.post('https://swapskills-backend.onrender.com/api/test', {
      test: 'data',
      timestamp: Date.now()
    });
    console.log('✅ Test:', testResponse.data);

    // Test 4: Signup with detailed error
    console.log('\n4️⃣ Signup Test:');
    try {
      const signupResponse = await axios.post('https://swapskills-backend.onrender.com/api/auth/signup', {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'testpassword123'
      });
      console.log('✅ Signup Success:', signupResponse.data);
    } catch (error) {
      console.log('❌ Signup Error:');
      console.log('   Status:', error.response?.status);
      console.log('   Message:', error.response?.data?.message);
      console.log('   Details:', error.response?.data?.details);
    }

  } catch (error) {
    console.log('❌ Backend check failed:', error.message);
  }
}

checkBackendStatus(); 