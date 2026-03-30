#!/bin/bash

echo "🚀 Bắt đầu deploy..."

# Build frontend
echo "📦 Building frontend..."
cd client
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build thành công!"
else
    echo "❌ Frontend build thất bại!"
    exit 1
fi

cd ..

# Deploy với Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✨ Deploy hoàn tất!"
echo "🎉 Kiểm tra URL của bạn trên Vercel dashboard"
