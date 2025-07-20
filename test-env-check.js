const axios = require('axios');

async function checkEnvironment() {
  try {
    console.log('🔍 Checking backend environment...');
    const response = await axios.get('https://swapskills-backend.onrender.com/api/env-check');
    console.log('✅ Environment check response:', response.data);
    
    if (!response.data.mongodb_uri_set) {
      console.log('❌ MONGODB_URI is not set in environment variables');
    }
    
    if (!response.data.jwt_secret_set) {
      console.log('❌ JWT_SECRET is not set in environment variables');
    }
    
    if (!response.data.database_connected) {
      console.log('❌ Database is not connected');
    }
    
  } catch (error) {
    console.log('❌ Environment check failed:', error.message);
  }
}

checkEnvironment(); 