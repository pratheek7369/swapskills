const mongoose = require('mongoose');

// Your exact connection string
const mongoUri = 'mongodb+srv://pratheek13acharya:MOWOipiuNmcbi7Dx@cluster0.op8jefe.mongodb.net/skillswap?retryWrites=true&w=majority&appName=Cluster0';

console.log('🔍 Testing your exact MongoDB connection...');
console.log('URI:', mongoUri);

// Set a longer timeout
mongoose.set('bufferTimeoutMS', 30000);

mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ MongoDB connected successfully!');
  console.log('Database:', mongoose.connection.name);
  console.log('Host:', mongoose.connection.host);
  console.log('Port:', mongoose.connection.port);
  
  // Test a simple query
  return mongoose.connection.db.admin().ping();
})
.then(() => {
  console.log('✅ Database ping successful!');
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection failed:');
  console.error('Error:', err.message);
  console.error('Code:', err.code);
  console.error('Name:', err.name);
  process.exit(1);
}); 