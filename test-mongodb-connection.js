const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://pratheek13acharya:MOWOipiuNmcbi7Dx@cluster0.op8jefe.mongodb.net/skillswap?retryWrites=true&w=majority&appName=Cluster0';

console.log('🔍 Testing MongoDB connection...');
console.log('URI:', mongoUri);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully!');
  console.log('Database:', mongoose.connection.name);
  console.log('Host:', mongoose.connection.host);
  console.log('Port:', mongoose.connection.port);
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
}); 