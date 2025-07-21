const axios = require('axios');

async function testLiveWebsite() {
  console.log('🔍 Testing live website connection...\n');

  try {
    // Test the exact API calls the frontend makes
    const apiUrl = 'https://swapskills-backend.onrender.com';
    
    console.log('1️⃣ Testing signup endpoint...');
    const signupData = {
      name: 'Live Test User',
      email: `live-test-${Date.now()}@example.com`,
      password: 'testpassword123'
    };
    
    const signupResponse = await axios.post(`${apiUrl}/api/auth/signup`, signupData);
    console.log('✅ Signup successful:', {
      message: signupResponse.data.message,
      user: signupResponse.data.user.name,
      token: signupResponse.data.token ? 'Token received' : 'No token'
    });
    
    console.log('\n2️⃣ Testing login endpoint...');
    const loginData = {
      email: signupData.email,
      password: signupData.password
    };
    
    const loginResponse = await axios.post(`${apiUrl}/api/auth/login`, loginData);
    console.log('✅ Login successful:', {
      message: loginResponse.data.message,
      user: loginResponse.data.user.name,
      token: loginResponse.data.token ? 'Token received' : 'No token'
    });
    
    console.log('\n🎉 Backend is working perfectly!');
    console.log('📱 Your live website should now work without Network Error.');
    console.log('🌐 Test at: https://swapskills-zeta.vercel.app/');
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

testLiveWebsite(); 