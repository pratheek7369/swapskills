const axios = require('axios');

async function testFrontendConnection() {
  console.log('🔍 Testing frontend connection to backend...\n');

  try {
    // Test the API URL that frontend uses
    const apiUrl = 'https://swapskills-backend.onrender.com';
    
    console.log('1️⃣ Testing API URL:', apiUrl);
    
    // Test health endpoint
    const healthResponse = await axios.get(`${apiUrl}/api/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test signup endpoint
    const signupData = {
      name: 'Frontend Test User',
      email: `frontend-test-${Date.now()}@example.com`,
      password: 'testpassword123'
    };
    
    console.log('\n2️⃣ Testing signup endpoint...');
    const signupResponse = await axios.post(`${apiUrl}/api/auth/signup`, signupData);
    console.log('✅ Signup successful:', {
      message: signupResponse.data.message,
      user: signupResponse.data.user,
      token: signupResponse.data.token ? 'Token received' : 'No token'
    });
    
    // Test login endpoint
    console.log('\n3️⃣ Testing login endpoint...');
    const loginData = {
      email: signupData.email,
      password: signupData.password
    };
    
    const loginResponse = await axios.post(`${apiUrl}/api/auth/login`, loginData);
    console.log('✅ Login successful:', {
      message: loginResponse.data.message,
      user: loginResponse.data.user,
      token: loginResponse.data.token ? 'Token received' : 'No token'
    });
    
    console.log('\n🎉 All tests passed! Frontend should work properly now.');
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

testFrontendConnection(); 