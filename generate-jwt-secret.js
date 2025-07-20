const crypto = require('crypto');

// Generate a secure random string for JWT secret
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('🔐 Generated JWT Secret:');
console.log(jwtSecret);
console.log('\n📋 Copy this value and use it as your JWT_SECRET environment variable'); 