const config = {
  API_URL: process.env.REACT_APP_API_URL || 'https://swapskills-backend.onrender.com',
  // Fallback for development
  getApiUrl: () => {
    if (process.env.NODE_ENV === 'development') {
      return process.env.REACT_APP_API_URL || 'http://localhost:5002';
    }
    return process.env.REACT_APP_API_URL || 'https://swapskills-backend.onrender.com';
  }
};

export default config; 