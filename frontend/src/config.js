const config = {
  API_URL: 'https://swapskills-backend.onrender.com/api',
  getApiUrl: () => {
    if (process.env.NODE_ENV === 'development') {
      return process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
    }
    return 'https://swapskills-backend.onrender.com/api';
  }
};

export default config; 