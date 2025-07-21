const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const skillRoutes = require('./routes/skills');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://swapskills-zeta.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://pratheek13acharya:MOWOipiuNmcbi7Dx@cluster0.op8jefe.mongodb.net/skillswap?retryWrites=true&w=majority&appName=Cluster0';

console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', mongoUri ? 'Set' : 'Not set');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
  console.log('Database:', mongoose.connection.name);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  console.error('Please check your MONGODB_URI environment variable');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SkillSwap API is running' });
});

// Test endpoint for debugging
app.post('/api/test', (req, res) => {
  console.log('Test endpoint hit:', req.body);
  res.json({ 
    status: 'OK', 
    message: 'Test endpoint working',
    receivedData: req.body,
    timestamp: new Date().toISOString()
  });
});

// Environment check endpoint (for debugging)
app.get('/api/env-check', (req, res) => {
  res.json({
    mongodb_uri_set: !!process.env.MONGODB_URI,
    jwt_secret_set: !!process.env.JWT_SECRET,
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_connected: mongoose.connection.readyState === 1,
    mongodb_uri_preview: process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.substring(0, 50) + '...' : 'Not set'
  });
});

// Note: Frontend is deployed separately to Vercel
// No static file serving needed in backend

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 