#!/bin/bash

# Local CI simulation script
set -e

echo "🚀 Running CI pipeline locally..."

# Set environment variables
export CI=true
export NODE_ENV=test
export PLAYWRIGHT_BASE_URL=http://localhost:3000

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[CI]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[CI]${NC} $1"
}

error() {
    echo -e "${RED}[CI]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
log "Checking prerequisites..."

if ! command_exists node; then
    error "Node.js not found. Please install Node.js"
    exit 1
fi

if ! command_exists npm; then
    error "npm not found. Please install npm"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    warn "Node.js version is $NODE_VERSION. Recommended version is 18+"
fi

# Step 1: Install dependencies
log "Step 1: Installing dependencies..."
npm ci || { error "Failed to install dependencies"; exit 1; }

# Step 2: Install Playwright browsers
log "Step 2: Installing Playwright browsers..."
npx playwright install --with-deps || { error "Failed to install Playwright browsers"; exit 1; }

# Step 3: Lint code
if npm run lint >/dev/null 2>&1; then
    log "Step 3: Running linter..."
    npm run lint || { error "Linting failed"; exit 1; }
else
    warn "Step 3: No lint script found, skipping..."
fi

# Step 4: Build application
log "Step 4: Building Next.js application..."
npm run build || { error "Build failed"; exit 1; }

# Step 5: Run tests
log "Step 5: Running Playwright tests..."
npm test || { error "Tests failed"; exit 1; }

# Step 6: Generate report
log "Step 6: Generating test report..."
if [ -d "playwright-report" ]; then
    log "Test report generated in playwright-report/"
    log "Run 'npm run test:report' to view the report"
fi

log "✅ All CI steps completed successfully!"

# Optional: Open test report
read -p "Would you like to open the test report? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run test:report
fi