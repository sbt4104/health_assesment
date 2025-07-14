# API-Only Deployment Guide

Since you're getting build errors with the full app, let's deploy just the API first to test it works.

## Step 1: Deploy API to Vercel

1. **Push your changes:**
   ```bash
   git add .
   git commit -m "API-only deployment for testing"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Deploy (no special configuration needed)

3. **Your API will be available at:**
   - `https://your-app.vercel.app/api/assessment`
   - `https://your-app.vercel.app/api/health`

## Step 2: Test the API

### Test with curl:
```bash
curl -X POST https://your-app.vercel.app/api/assessment \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 27,
    "height": 67,
    "currentWeight": 200,
    "gender": "Male",
    "activityLevel": "Sedentary",
    "primaryGoal": "Weight Loss",
    "workoutFrequency": 3,
    "sessionDuration": 60,
    "targetWeight": 180
  }'
```

### Test with Postman:
- URL: `https://your-app.vercel.app/api/assessment`
- Method: `POST`
- Headers: `Content-Type: application/json`
- Body: Use the JSON data above

## Step 3: If API Works, Deploy Frontend

Once the API is working, we can deploy the frontend separately:

1. **Deploy frontend to Vercel:**
   - Set root directory to `client`
   - Add environment variable: `REACT_APP_API_URL=https://your-api-url.vercel.app`

2. **Or use Railway for backend:**
   - Deploy `server` folder to Railway
   - Update frontend environment variable

## Current Configuration

The current `vercel.json` only deploys the API:
```json
{
  "version": 2,
  "functions": {
    "api/assessment.js": {
      "maxDuration": 30
    }
  }
}
```

This should work without the React build issues! 