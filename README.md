# Ứng Dụng Checklist Ngày Kỷ Niệm

Ứng dụng web hoàn chỉnh để lưu trữ và quản lý các kỷ niệm đặc biệt với giao diện đẹp mắt và nhiều tính năng nâng cao.

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

### Quản lý kỷ niệm cơ bản
- ✅ Thêm kỷ niệm mới với tiêu đề, ngày tháng và hình ảnh
- ✅ Chỉnh sửa và xóa kỷ niệm
- ✅ Hiển thị danh sách kỷ niệm với màu sắc đa dạng
- ✅ Hiển thị thời gian đã qua (days/weeks)
- ✅ Giao diện responsive, đẹp mắt

### Phân loại & Tổ chức
- ✅ 6 danh mục: Hẹn hò, Du lịch, Quà tặng, Ăn uống, Đặc biệt, Khác
- ✅ 10 loại cảm xúc (mood) để thể hiện
- ✅ Tags/nhãn tùy chỉnh cho mỗi kỷ niệm
- ✅ Đánh dấu yêu thích (favorite/pin)

### Tìm kiếm & Lọc
- ✅ Tìm kiếm theo tiêu đề và mô tả
- ✅ Sắp xếp: Mới nhất, Cũ nhất, Theo danh mục
- ✅ Lọc theo danh mục
- ✅ Lọc nâng cao:
  - Khoảng thời gian (từ ngày - đến ngày)
  - Theo cảm xúc (mood)
  - Có/không có hình ảnh
  - Theo tags
- ✅ Lưu và tải lại bộ lọc thường dùng
- ✅ Hiển thị chỉ kỷ niệm yêu thích

### Hiển thị
- ✅ 2 chế độ xem: Grid view và Timeline view
- ✅ Timeline nhóm theo tháng/năm
- ✅ Gallery/Album view với slideshow
- ✅ Zoom và swipe ảnh trong gallery
- ✅ Thumbnails navigation

### Thông báo & Nhắc nhở
- ✅ Nhắc nhở sự kiện sắp tới (trong vòng 7 ngày)
- ✅ Countdown đặc biệt tùy chỉnh
- ✅ Đếm ngược đến các mốc quan trọng
- ✅ Hiển thị số ngày yêu nhau

### Widget & Mini View
- ✅ Widget hiển thị kỷ niệm ngẫu nhiên
- ✅ "Kỷ niệm trong ngày này năm trước"
- ✅ Refresh để xem kỷ niệm khác
- ✅ Có thể ẩn/hiện widget

### Thống kê & Dashboard
- ✅ Tổng số kỷ niệm và ảnh
- ✅ Biểu đồ cột theo danh mục
- ✅ Danh mục yêu thích nhất
- ✅ 5 kỷ niệm gần đây
- ✅ Phân tích chi tiết

### Chỉnh sửa hàng loạt
- ✅ Chọn nhiều kỷ niệm cùng lúc
- ✅ Xóa hàng loạt
- ✅ Đổi danh mục hàng loạt
- ✅ Xuất nhiều kỷ niệm đã chọn

### Sao lưu & Chia sẻ
- ✅ Export toàn bộ dữ liệu ra JSON
- ✅ Import dữ liệu từ file backup
- ✅ Export kỷ niệm đã chọn
- ✅ Chia sẻ kỷ niệm (Web Share API)
- ✅ Copy to clipboard

### Ghi chú nhanh
- ✅ Thêm ghi chú nhanh không cần ảnh
- ✅ Lưu ngay lập tức
- ✅ Modal đẹp với animation

### Giao diện
- ✅ Chế độ tối (Dark Mode)
- ✅ Lưu preference người dùng
- ✅ Animation mượt mà
- ✅ Responsive hoàn toàn
- ✅ Background ảnh tùy chỉnh

### Cài đặt
- ✅ Tùy chỉnh ngày bắt đầu yêu
- ✅ Tên cặp đôi
- ✅ Quản lý backup/restore

## Cấu trúc dự án

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── App.jsx        # Component chính
│   │   ├── App.css        # Styles
│   │   └── main.jsx       # Entry point
│   └── public/
│       └── images/        # Ảnh background
├── server/                # Backend Express
│   ├── server.js          # API server
│   ├── uploads/           # Thư mục lưu ảnh
│   └── .env              # Cấu hình
└── README.md
```

## API Endpoints

- `GET /api/memories` - Lấy tất cả kỷ niệm
- `POST /api/memories` - Tạo kỷ niệm mới
- `PUT /api/memories/:id` - Cập nhật kỷ niệm
- `DELETE /api/memories/:id` - Xóa kỷ niệm
- `GET /api/settings` - Lấy cài đặt
- `PUT /api/settings` - Cập nhật cài đặt

## Tính năng nổi bật

1. **Hoàn toàn offline-first**: Lưu trữ local với localStorage
2. **Responsive**: Hoạt động tốt trên mọi thiết bị
3. **Fast & Smooth**: Animation 60fps
4. **User-friendly**: Giao diện trực quan, dễ sử dụng
5. **Feature-rich**: Đầy đủ tính năng quản lý kỷ niệm chuyên nghiệp

## Hướng dẫn sử dụng

1. **Thêm kỷ niệm**: Click nút + ở góc dưới
2. **Ghi chú nhanh**: Click nút 📝 để thêm nhanh
3. **Tìm kiếm**: Dùng ô tìm kiếm và bộ lọc
4. **Xem ảnh**: Click vào ảnh hoặc dùng Gallery view
5. **Yêu thích**: Click ⭐ trên mỗi kỷ niệm
6. **Chỉnh sửa hàng loạt**: Bật chế độ 📋 để chọn nhiều
7. **Thống kê**: Click 📊 để xem phân tích
8. **Backup**: Vào Cài đặt ⚙️ để xuất/nhập dữ liệu

## License

MIT
