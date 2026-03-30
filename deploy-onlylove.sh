#!/bin/bash

echo "🚀 Deploy lên onlylovehnpl.vercel.app"
echo ""

# Check if in correct directory
if [ ! -d "client" ]; then
    echo "❌ Lỗi: Không tìm thấy thư mục client"
    echo "Vui lòng chạy script từ thư mục gốc dự án"
    exit 1
fi

# Build frontend
echo "📦 Building frontend..."
cd client
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build thất bại!"
    exit 1
fi

echo "✅ Build thành công!"
echo ""

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
echo "Project: onlylovehnpl"
echo ""

vercel --prod --name onlylovehnpl

if [ $? -ne 0 ]; then
    echo "❌ Deploy thất bại!"
    exit 1
fi

cd ..

echo ""
echo "✨ Deploy hoàn tất!"
echo ""
echo "🎉 Ứng dụng của bạn đã online tại:"
echo "👉 https://onlylovehnpl.vercel.app"
echo ""
echo "🎬 Slideshow:"
echo "👉 https://onlylovehnpl.vercel.app/love-slideshow"
echo ""
echo "💝 Hãy chia sẻ với người thân yêu!"
echo ""
