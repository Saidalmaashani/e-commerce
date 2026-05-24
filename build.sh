#!/bin/bash

# Build script for Render.com deployment
# This ensures all dependencies are properly installed

cd frontend

echo "🔧 Installing dependencies..."
npm install --legacy-peer-deps --no-optional

echo "🏗️  Building Next.js app..."
npm run build

echo "✅ Build completed successfully!"
