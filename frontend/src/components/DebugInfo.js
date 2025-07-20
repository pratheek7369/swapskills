import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const DebugInfo = () => {
  const [debugInfo, setDebugInfo] = useState({
    apiUrl: '',
    healthStatus: '',
    corsStatus: '',
    signupTest: ''
  });

  const testAPI = async () => {
    const apiUrl = config.getApiUrl();
    setDebugInfo(prev => ({ ...prev, apiUrl }));

    try {
      // Test health endpoint
      const healthResponse = await axios.get(`${apiUrl}/api/health`);
      setDebugInfo(prev => ({ ...prev, healthStatus: '✅ Connected' }));
    } catch (error) {
      setDebugInfo(prev => ({ ...prev, healthStatus: `❌ Error: ${error.message}` }));
    }

    try {
      // Test CORS
      const corsResponse = await axios.get(`${apiUrl}/api/health`, {
        headers: { 'Origin': window.location.origin }
      });
      setDebugInfo(prev => ({ ...prev, corsStatus: '✅ CORS OK' }));
    } catch (error) {
      setDebugInfo(prev => ({ ...prev, corsStatus: `❌ CORS Error: ${error.message}` }));
    }

    try {
      // Test signup endpoint
      const testUser = {
        name: 'Debug Test',
        email: `debug${Date.now()}@test.com`,
        password: 'test123456'
      };
      const signupResponse = await axios.post(`${apiUrl}/api/auth/signup`, testUser);
      setDebugInfo(prev => ({ ...prev, signupTest: '✅ Signup OK' }));
    } catch (error) {
      setDebugInfo(prev => ({ 
        ...prev, 
        signupTest: `❌ Signup Error: ${error.response?.data?.message || error.message}` 
      }));
    }
  };

  useEffect(() => {
    testAPI();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
      <h3 className="font-bold text-sm mb-2">Debug Info</h3>
      <div className="text-xs space-y-1">
        <div><strong>API URL:</strong> {debugInfo.apiUrl}</div>
        <div><strong>Health:</strong> {debugInfo.healthStatus}</div>
        <div><strong>CORS:</strong> {debugInfo.corsStatus}</div>
        <div><strong>Signup:</strong> {debugInfo.signupTest}</div>
      </div>
      <button 
        onClick={testAPI}
        className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
      >
        Retest
      </button>
    </div>
  );
};

export default DebugInfo; 