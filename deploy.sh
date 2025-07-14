#!/bin/bash

# Fitness Assessment App Deployment Script
echo "🚀 Fitness Assessment App Deployment Helper"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if package.json exists in root
if [ ! -f "package.json" ]; then
    echo "📝 Creating root package.json..."
    cat > package.json << EOF
{
  "name": "fitness-assessment-app",
  "version": "1.0.0",
  "description": "Fitness Assessment App with React frontend and Node.js backend",
  "scripts": {
    "start": "node server/index.js",
    "build": "cd client && npm run build",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd server && npm start",
    "client": "cd client && npm start",
    "install-all": "npm install && cd client && npm install && cd ../server && npm install"
  },
  "keywords": ["fitness", "assessment", "react", "nodejs"],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "concurrently": "^7.6.0"
  }
}
EOF
    echo "✅ Root package.json created"
fi

# Check if .env files exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
NODE_ENV=development
PORT=5000
EOF
    echo "✅ .env file created"
fi

if [ ! -f "client/.env" ]; then
    echo "📝 Creating client .env file..."
    cat > client/.env << EOF
REACT_APP_API_URL=http://localhost:5000
EOF
    echo "✅ Client .env file created"
fi

echo ""
echo "🎯 Deployment Options:"
echo "1. Vercel (Frontend) + Railway (Backend) - Recommended"
echo "2. Heroku (All-in-One)"
echo "3. Netlify (Frontend) + Railway (Backend)"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git remote add origin https://github.com/yourusername/fitness-assessment-app.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy Backend to Railway:"
echo "   - Go to railway.app"
echo "   - Connect GitHub account"
echo "   - Deploy from repository"
echo "   - Set root directory to 'server'"
echo ""
echo "3. Deploy Frontend to Vercel:"
echo "   - Go to vercel.com"
echo "   - Connect GitHub account"
echo "   - Import repository"
echo "   - Set root directory to 'client'"
echo "   - Add environment variable: REACT_APP_API_URL=https://your-railway-url.railway.app"
echo ""
echo "4. Update CORS in server/index.js with your actual frontend domain"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "✅ Setup complete! Choose your deployment platform and follow the steps above." 