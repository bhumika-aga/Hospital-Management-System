#!/bin/bash

# Hospital Management System Deployment Script
# Optimized for Render.com deployment

set -e

echo "🏥 Hospital Management System - Deployment Script"
echo "================================================="

# Build backend
echo "📦 Building backend JAR..."
cd monolithic-app
mvn clean package -DskipTests -Dmaven.test.skip=true -q
echo "✅ Backend build completed"

# Build frontend
echo "🌐 Building frontend..."
cd ../member-portal
npm ci --production=false
npm run build
echo "✅ Frontend build completed"

cd ..

# Display build artifacts
echo ""
echo "📋 Build Summary:"
echo "Backend JAR: $(du -h monolithic-app/target/hospital-management-system-2.0.0.jar 2>/dev/null || echo 'Not found')"
echo "Frontend Build: $(du -sh member-portal/build 2>/dev/null || echo 'Not found')"

echo ""
echo "🚀 Ready for deployment!"
echo "Backend Health Check: http://localhost:8080/actuator/health"
echo "Frontend URL: http://localhost:3000"
echo "API Docs: http://localhost:8080/swagger-ui.html"
echo ""
echo "For Render.com deployment:"
echo "1. Push to GitHub"
echo "2. Connect repository to Render"
echo "3. Render will auto-detect render.yaml"
echo "4. Services will deploy automatically"