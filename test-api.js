const axios = require('axios');

const API_URL = 'https://swapskills-backend.onrender.com';

async function testAPI() {
  console.log('Testing API connectivity...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_URL}/api/health`);
    console.log('✅ Health check passed:', healthResponse.data);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }

  try {
    // Test signup endpoint
    console.log('\n2. Testing signup endpoint...');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'testpassword123'
    };
    
    const signupResponse = await axios.post(`${API_URL}/api/auth/signup`, testUser);
    console.log('✅ Signup test passed:', signupResponse.data);
  } catch (error) {
    console.log('❌ Signup test failed:', error.response?.data || error.message);
  }

  try {
    // Test CORS
    console.log('\n3. Testing CORS...');
    const corsResponse = await axios.get(`${API_URL}/api/health`, {
      headers: {
        'Origin': 'https://swapskills.vercel.app'
      }
    });
    console.log('✅ CORS test passed');
  } catch (error) {
    console.log('❌ CORS test failed:', error.message);
  }
}

testAPI(); 