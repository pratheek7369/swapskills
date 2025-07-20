const axios = require('axios');

const API_URL = 'https://swapskills-backend.onrender.com';

async function testBackendDetailed() {
  console.log('🔍 Detailed Backend Testing...\n');

  // Test 1: Basic connectivity
  console.log('1️⃣ Testing basic connectivity...');
  try {
    const response = await axios.get(`${API_URL}/api/health`);
    console.log('✅ Health check passed:', response.data);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return;
  }

  // Test 2: Test endpoint
  console.log('\n2️⃣ Testing test endpoint...');
  try {
    const testData = { test: 'data', timestamp: Date.now() };
    const response = await axios.post(`${API_URL}/api/test`, testData);
    console.log('✅ Test endpoint passed:', response.data);
  } catch (error) {
    console.log('❌ Test endpoint failed:', error.response?.data || error.message);
  }

  // Test 3: Signup with detailed error logging
  console.log('\n3️⃣ Testing signup endpoint...');
  try {
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'testpassword123'
    };
    
    console.log('📤 Sending signup request with data:', testUser);
    const response = await axios.post(`${API_URL}/api/auth/signup`, testUser);
    console.log('✅ Signup successful:', response.data);
  } catch (error) {
    console.log('❌ Signup failed');
    console.log('   Error message:', error.message);
    console.log('   Status code:', error.response?.status);
    console.log('   Response data:', error.response?.data);
    console.log('   Response headers:', error.response?.headers);
  }

  // Test 4: CORS test
  console.log('\n4️⃣ Testing CORS...');
  try {
    const response = await axios.get(`${API_URL}/api/health`, {
      headers: {
        'Origin': 'https://swapskills.vercel.app',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    console.log('✅ CORS test passed');
  } catch (error) {
    console.log('❌ CORS test failed:', error.message);
  }

  // Test 5: Login test
  console.log('\n5️⃣ Testing login endpoint...');
  try {
    const loginData = {
      email: 'test@example.com',
      password: 'testpassword123'
    };
    const response = await axios.post(`${API_URL}/api/auth/login`, loginData);
    console.log('✅ Login test passed:', response.data);
  } catch (error) {
    console.log('❌ Login test failed:', error.response?.data?.message || error.message);
  }
}

testBackendDetailed(); 