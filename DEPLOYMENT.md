# Fitness Assessment App - Deployment Guide

## Overview
This app consists of:
- **Frontend**: React app (client folder)
- **Backend**: Node.js/Express API (server folder)

## Option 1: Vercel + Railway (Recommended)

### Step 1: Prepare for Deployment

1. **Create a GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/fitness-assessment-app.git
   git push -u origin main
   ```

2. **Update package.json scripts** (if needed):
   ```json
   {
     "scripts": {
       "start": "node server/index.js",
       "build": "cd client && npm run build"
     }
   }
   ```

### Step 2: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set the **Root Directory** to `server`
6. Railway will automatically detect it's a Node.js app
7. Add environment variables if needed:
   - `PORT`: Railway will set this automatically
   - `NODE_ENV`: `production`

### Step 3: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project" → Import your repository
4. Set the **Root Directory** to `client`
5. Vercel will automatically detect it's a React app
6. Add environment variable:
   - `REACT_APP_API_URL`: Your Railway backend URL (e.g., `https://your-app.railway.app`)

### Step 4: Update Frontend API Configuration

Create a config file to handle different environments:

```javascript
// client/src/config/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  assessment: `${API_BASE_URL}/api/assessment`
};
```

Update your fetch calls to use this config.

## Option 2: Heroku (All-in-One)

### Step 1: Prepare for Heroku

1. **Install Heroku CLI**:
   ```bash
   brew install heroku/brew/heroku
   ```

2. **Create Procfile** in root directory:
   ```
   web: node server/index.js
   ```

3. **Update package.json** in root:
   ```json
   {
     "scripts": {
       "start": "node server/index.js",
       "build": "cd client && npm install && npm run build",
       "postinstall": "cd client && npm install"
     },
     "engines": {
       "node": "18.x"
     }
   }
   ```

4. **Update server to serve React build**:
   ```javascript
   // server/index.js
   const path = require('path');
   
   // Serve static files from React build
   app.use(express.static(path.join(__dirname, '../client/build')));
   
   // Handle React routing
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
   });
   ```

### Step 2: Deploy to Heroku

```bash
heroku create your-app-name
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main
```

## Option 3: Netlify (Frontend) + Railway (Backend)

Similar to Vercel + Railway, but using Netlify for frontend hosting.

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.railway.app
```

## CORS Configuration

Update your backend CORS settings for production:

```javascript
// server/index.js
const cors = require('cors');

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app']
    : ['http://localhost:3000'],
  credentials: true
}));
```

## Cost Estimates

- **Vercel**: Free tier (100GB bandwidth/month)
- **Railway**: Free tier (500 hours/month)
- **Heroku**: Free tier discontinued, paid plans start at $7/month
- **Netlify**: Free tier (100GB bandwidth/month)

## Recommended: Vercel + Railway

This combination offers:
- ✅ Free tiers
- ✅ Automatic deployments
- ✅ Easy setup
- ✅ Good performance
- ✅ SSL certificates included

## Troubleshooting

### Common Issues:

1. **CORS errors**: Update CORS configuration for production domains
2. **API not found**: Check environment variables and API URLs
3. **Build failures**: Ensure all dependencies are in package.json
4. **Port issues**: Let the platform set the PORT environment variable

### Debugging:

1. Check deployment logs in your platform's dashboard
2. Test API endpoints with tools like Postman
3. Check browser console for frontend errors
4. Verify environment variables are set correctly

## Next Steps

1. Choose your deployment platform
2. Follow the step-by-step guide above
3. Test your deployed app
4. Set up custom domain (optional)
5. Configure monitoring and analytics 