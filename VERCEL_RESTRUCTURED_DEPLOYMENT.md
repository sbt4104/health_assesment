# Vercel Deployment Guide - Restructured Format

This project has been restructured to follow Vercel's preferred format for optimal deployment.

## Project Structure

```
health-assesment/
├── api/                    # Serverless API functions
│   ├── assessment.js      # Main API endpoint
│   ├── utils/            # API utilities
│   │   └── fitnessCalculations.js
│   └── package.json      # API dependencies
├── src/                   # React application source
├── public/               # Static assets
├── package.json          # Main app dependencies and scripts
├── vercel.json          # Vercel configuration
└── build/               # Production build (generated)
```

## Key Changes Made

### 1. **React App Moved to Root**
- Moved `client/src/` → `src/`
- Moved `client/public/` → `public/`
- Consolidated `client/package.json` into root `package.json`

### 2. **API Restructured for Serverless**
- Converted Express app to Vercel serverless function
- Moved `server/utils/` → `api/utils/`
- Removed Express dependencies
- Updated API to use Vercel's `(req, res)` handler format

### 3. **Vercel Configuration Updated**
- Updated `vercel.json` to point to root `package.json`
- Configured routes for both API and static files
- Set function timeout for API

## Deployment Steps

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Build the Application**
```bash
npm run build
```

### 3. **Deploy to Vercel**

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set project name
# - Confirm deployment
```

#### Option B: Using Vercel Dashboard
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration

### 4. **Environment Variables**
Set these in your Vercel project settings:
```
REACT_APP_API_URL=https://your-app.vercel.app
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Assessment Generation
```
POST /api/assessment
Content-Type: application/json

{
  "name": "John Doe",
  "age": 30,
  "height": 70,
  "currentWeight": 180,
  "gender": "Male",
  "activityLevel": "Moderately Active",
  "primaryGoal": "Weight Loss",
  "workoutFrequency": 4,
  "sessionDuration": 60
}
```

## Development

### Local Development
```bash
# Start React development server
npm start

# The API will be available at /api/* endpoints
# React app will proxy API calls to localhost:5001
```

### Testing API Locally
```bash
# Install Vercel CLI for local testing
npm i -g vercel

# Run API functions locally
vercel dev
```

## Benefits of This Structure

1. **Vercel Optimized**: Follows Vercel's recommended structure
2. **Simplified Deployment**: Single repository, single deployment
3. **Better Performance**: Serverless functions scale automatically
4. **Cost Effective**: Pay only for actual usage
5. **Easy Maintenance**: Clear separation of concerns

## Troubleshooting

### Build Issues
- Ensure all dependencies are in root `package.json`
- Check that `src/` and `public/` are at root level
- Verify `vercel.json` configuration

### API Issues
- Check function timeout settings in `vercel.json`
- Ensure CORS headers are properly set
- Verify API routes are correctly configured

### Environment Variables
- Set `REACT_APP_API_URL` in Vercel dashboard
- Use `https://your-app.vercel.app` for production
- Use `http://localhost:3000` for local development

## Migration Notes

If migrating from the old structure:
1. Remove `client/` and `server/` directories
2. Update any import paths in your code
3. Update any deployment scripts
4. Test thoroughly before deploying

## Support

For issues with this deployment structure:
1. Check Vercel logs in dashboard
2. Verify API function configuration
3. Test locally with `vercel dev`
4. Review Vercel documentation for serverless functions 