# Deployment Setup Guide

## Environment Variables Configuration

### For Vercel (Frontend)

1. Go to your Vercel dashboard
2. Select your frontend project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:

```
Name: REACT_APP_API_URL
Value: https://swapskills-backend.onrender.com
Environment: Production, Preview, Development
```

### For Render (Backend)

1. Go to your Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Add the following variables:

```
MONGODB_URI=mongodb+srv://pratheek13acharya:MOWOipiuNmcbi7Dx@cluster0.op8jefe.mongodb.net/skillswap?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Deployment Status Check

### Backend Health Check
Visit: `https://swapskills-backend.onrender.com/api/health`

Expected response:
```json
{
  "status": "OK",
  "message": "SkillSwap API is running"
}
```

### Frontend Test
After setting environment variables, test the signup functionality on your live website.

## Troubleshooting

### If Backend Shows "Server Error":
1. Check Render logs for specific error messages
2. Verify MongoDB connection string
3. Check if all environment variables are set

### If Frontend Can't Connect:
1. Verify `REACT_APP_API_URL` is set correctly in Vercel
2. Check browser console for CORS errors
3. Test API endpoints directly

### Quick Test Commands:
```bash
# Test backend health
curl https://swapskills-backend.onrender.com/api/health

# Test signup endpoint
curl -X POST https://swapskills-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
``` 