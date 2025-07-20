const axios = require('axios');

async function testSignupDirect() {
  console.log('🔍 Testing signup directly...');
  
  try {
    const signupData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'testpassword123'
    };
    
    console.log('📤 Sending signup request:', signupData);
    
    const response = await axios.post('https://swapskills-backend.onrender.com/api/auth/signup', signupData, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Signup successful:', response.data);
    
  } catch (error) {
    console.log('❌ Signup failed:');
    console.log('   Status:', error.response?.status);
    console.log('   Message:', error.response?.data?.message);
    console.log('   Details:', error.response?.data?.details);
    console.log('   Full error:', error.message);
  }
}

testSignupDirect(); 