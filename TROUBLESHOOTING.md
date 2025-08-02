# Hospital Management System - Render Deployment Troubleshooting Guide

## Issues Fixed

### 1. **Backend Configuration Issues** ✅
- **Fixed**: Build command was incorrect (`npm run build:backend` → `cd backend && npm install`)
- **Fixed**: Start command was incorrect (`npm run start:backend` → `cd backend && npm start`)
- **Fixed**: Environment variable mismatches (JWT_SECRET → JWT_SECRET_KEY, JWT_EXPIRE → JWT_EXPIRES)
- **Fixed**: Added proper host binding for Render (0.0.0.0)
- **Fixed**: Added health check endpoint for Render monitoring

### 2. **Circular Dependencies** ✅
- **Fixed**: Removed circular dependency `hospital-management-system-web-application: "file:.."` from all package.json files
- This was causing build failures and dependency resolution issues

### 3. **CORS Configuration** ✅
- **Fixed**: Updated CORS configuration to work properly in production
- **Fixed**: Added proper origin URLs for Render deployment

### 4. **Port Configuration** ✅
- **Fixed**: Backend now properly uses PORT environment variable (10000 for Render)
- **Fixed**: Added fallback to port 4000 for local development

## Environment Variables to Set in Render Dashboard

### Backend Service (`hospital-management-backend`)
Make sure these environment variables are set in your Render dashboard:

```
NODE_ENV=production
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL_ONE=https://hospital-management-frontend.onrender.com
FRONTEND_URL_TWO=https://hospital-management-dashboard.onrender.com
```

### Frontend Service (`hospital-management-frontend`)
```
VITE_API_URL=https://hospital-management-backend.onrender.com
VITE_DASHBOARD_URL=https://hospital-management-dashboard.onrender.com
```

### Dashboard Service (`hospital-management-dashboard`)
```
VITE_API_URL=https://hospital-management-backend.onrender.com
VITE_FRONTEND_URL=https://hospital-management-frontend.onrender.com
```

## Common Error Solutions

### 1. **Build Failures**
- **Error**: `Module not found` or `Cannot resolve module`
- **Solution**: Circular dependencies have been removed. Re-deploy after the fixes.

### 2. **Port Binding Issues**
- **Error**: `EADDRINUSE` or connection refused
- **Solution**: Backend now properly binds to 0.0.0.0:10000 for Render

### 3. **CORS Errors**
- **Error**: `Access to fetch at '...' from origin '...' has been blocked by CORS policy`
- **Solution**: CORS configuration updated for production with proper origins

### 4. **Database Connection Issues**
- **Error**: `MongoNetworkError` or connection timeout
- **Solution**: Ensure MONGO_URI is correctly set in Render environment variables

### 5. **Static File Serving Issues**
- **Error**: 404 errors for frontend/dashboard routes
- **Solution**: Backend now properly serves static files from build directories

## Deployment Steps

1. **Commit and push** the fixed code to your repository
2. **Redeploy** all services in Render dashboard
3. **Check logs** for any remaining errors
4. **Verify** environment variables are set correctly
5. **Test** the health check endpoint: `https://hospital-management-backend.onrender.com/health`

## Monitoring and Debugging

### Health Check Endpoint
- URL: `https://hospital-management-backend.onrender.com/health`
- Expected response: `{"status":"OK","message":"Server is running"}`

### Log Locations
- **Render Dashboard** → Your Service → Logs
- **Build Logs**: Check during deployment
- **Runtime Logs**: Check for runtime errors

### Common Log Patterns to Watch For
- `Connected to database!` - Database connection successful
- `Server listening at 0.0.0.0:10000` - Server started correctly
- `Environment: production` - Production mode active

## Next Steps

1. Deploy the updated code
2. Set all environment variables in Render dashboard
3. Monitor the logs for any remaining issues
4. Test all functionality (login, appointments, etc.)

If you still encounter issues after these fixes, please share the specific error messages from the Render logs. 