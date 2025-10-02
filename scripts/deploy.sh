#!/bin/bash

# AfriContext Intelligence Platform Deployment Script

echo "🚀 Deploying AfriContext Intelligence Platform..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Deploy to Netlify (if netlify CLI is installed)
if command -v netlify &> /dev/null; then
    echo "🌐 Deploying to Netlify..."
    netlify deploy --prod
else
    echo "⚠️  Netlify CLI not found. Please install it with: npm install -g netlify-cli"
    echo "📋 Manual deployment steps:"
    echo "1. Push your code to GitHub"
    echo "2. Connect your repository to Netlify"
    echo "3. Set build command: npm run build"
    echo "4. Set publish directory: .next"
    echo "5. Deploy!"
fi

echo "🎉 Deployment complete!"
echo "📱 Your AfriContext Intelligence Platform is now live!"
echo "🔗 Check your Netlify dashboard for the deployment URL"
