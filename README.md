# Ứng Dụng Checklist Ngày Kỷ Niệm

Ứng dụng web để lưu trữ và quản lý các kỷ niệm đặc biệt với giao diện đẹp mắt.

## Công nghệ sử dụng

- Frontend: ReactJS + Vite
- Backend: Node.js + Express
- Database: MongoDB

## Cài đặt

1. Cài đặt MongoDB và chạy MongoDB server
2. Cài đặt dependencies:
```bash
npm run install-all
```

3. Tạo thư mục uploads cho server:
```bash
mkdir server/uploads
```

4. Chạy ứng dụng:
```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Tính năng

- Thêm kỷ niệm mới với tiêu đề, ngày tháng và hình ảnh
- Hiển thị danh sách kỷ niệm với màu sắc đa dạng
- Xóa kỷ niệm
- Hiển thị thời gian đã qua (days/weeks)
- Giao diện responsive, đẹp mắt giống ảnh mẫu
