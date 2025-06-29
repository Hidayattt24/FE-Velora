#!/bin/bash

# Velora Frontend Deployment Script
echo "🚀 Starting Velora Frontend Deployment to Vercel..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the fe-velora directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running ESLint checks..."
npm run lint

# Check for TypeScript errors
echo "🔧 Checking TypeScript..."
npx tsc --noEmit

# Run build to test locally
echo "🏗️ Testing build locally..."
npm run build

# If build successful, proceed with deployment
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Proceeding with deployment..."
    
    # Install Vercel CLI if not already installed
    if ! command -v vercel &> /dev/null; then
        echo "📥 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Deploy to Vercel
    echo "🌐 Deploying to Vercel..."
    vercel --prod
    
    echo "🎉 Deployment completed!"
    echo "📋 Don't forget to:"
    echo "   - Set environment variables in Vercel dashboard"
    echo "   - Test the production URL"
    echo "   - Configure custom domain if needed"
    
else
    echo "❌ Build failed! Please fix the errors before deploying."
    exit 1
fi
