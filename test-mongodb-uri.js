const axios = require('axios');

async function checkMongoDBURI() {
  console.log('🔍 Checking MongoDB URI in Render...\n');

  try {
    const response = await axios.get('https://swapskills-backend.onrender.com/api/env-check');
    console.log('✅ Environment check response:');
    console.log(JSON.stringify(response.data, null, 2));
    
    // Check if the URI contains the database name
    if (response.data.mongodb_uri_preview) {
      console.log('\n📋 MongoDB URI Preview:', response.data.mongodb_uri_preview);
      
      if (response.data.mongodb_uri_preview.includes('/skillswap')) {
        console.log('✅ URI contains database name');
      } else {
        console.log('❌ URI missing database name - this is the issue!');
        console.log('💡 The URI should end with /skillswap?retryWrites=true&w=majority');
      }
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

checkMongoDBURI(); 