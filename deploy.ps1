# Velora Frontend Deployment Script (PowerShell)
Write-Host "🚀 Starting Velora Frontend Deployment to Vercel..." -ForegroundColor Green

# Check if we're in the correct directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the fe-velora directory." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Run linting
Write-Host "🔍 Running ESLint checks..." -ForegroundColor Yellow
npm run lint

# Check for TypeScript errors
Write-Host "🔧 Checking TypeScript..." -ForegroundColor Yellow
npx tsc --noEmit

# Run build to test locally
Write-Host "🏗️ Testing build locally..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful! Proceeding with deployment..." -ForegroundColor Green
    
    # Check if Vercel CLI is installed
    $vercelExists = Get-Command vercel -ErrorAction SilentlyContinue
    if (!$vercelExists) {
        Write-Host "📥 Installing Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel
    }
    
    # Deploy to Vercel
    Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Yellow
    vercel --prod
    
    Write-Host "🎉 Deployment completed!" -ForegroundColor Green
    Write-Host "📋 Don't forget to:" -ForegroundColor Cyan
    Write-Host "   - Set environment variables in Vercel dashboard" -ForegroundColor White
    Write-Host "   - Test the production URL" -ForegroundColor White
    Write-Host "   - Configure custom domain if needed" -ForegroundColor White
    
} else {
    Write-Host "❌ Build failed! Please fix the errors before deploying." -ForegroundColor Red
    exit 1
}
