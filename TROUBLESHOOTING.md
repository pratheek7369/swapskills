# Signup Issues Troubleshooting Guide

## Common Issues and Solutions

### 1. CORS Issues
**Symptoms**: Network errors in browser console, "CORS policy" errors
**Solution**: 
- Backend CORS has been updated to allow more origins
- Check if your frontend domain is in the allowed origins list

### 2. API URL Configuration
**Symptoms**: "Network Error" or "Failed to fetch"
**Solution**:
- Frontend now uses dynamic API URL configuration
- Removed proxy configuration that doesn't work in production
- Check environment variables in your deployment platform

### 3. Environment Variables
**For Vercel Frontend Deployment**:
Add these environment variables in your Vercel dashboard:
```
REACT_APP_API_URL=https://swapskills-backend.onrender.com
```

**For Render Backend Deployment**:
Add these environment variables in your Render dashboard:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Database Connection Issues
**Symptoms**: "Server error" responses
**Solution**:
- Check if MongoDB connection string is correct
- Verify database permissions
- Check if the database is accessible from Render

### 5. Validation Errors
**Symptoms**: Specific error messages about field requirements
**Solution**:
- Ensure all required fields are filled
- Check email format
- Password must be at least 6 characters

## Debugging Steps

### 1. Check Browser Console
Open browser developer tools and look for:
- Network errors
- CORS errors
- JavaScript errors

### 2. Test API Directly
Run the test script:
```bash
node test-api.js
```

### 3. Check Backend Logs
In your Render dashboard, check the logs for:
- Request received messages
- Error messages
- Database connection issues

### 4. Verify Frontend Configuration
Check if the API URL is correctly set in your frontend deployment.

## Quick Fixes

### If signup still fails:

1. **Clear browser cache and cookies**
2. **Try in incognito/private mode**
3. **Check if the backend is running** by visiting: `https://swapskills-backend.onrender.com/api/health`
4. **Verify your frontend domain** is in the CORS allowed origins

### Environment Variables Setup

**For Vercel:**
1. Go to your project dashboard
2. Navigate to Settings > Environment Variables
3. Add: `REACT_APP_API_URL` = `https://swapskills-backend.onrender.com`

**For Render:**
1. Go to your service dashboard
2. Navigate to Environment
3. Add your MongoDB URI and JWT secret

## Contact Support

If issues persist:
1. Check the backend logs in Render
2. Test the API endpoints directly
3. Verify all environment variables are set correctly 