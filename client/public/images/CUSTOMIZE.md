# Tùy chỉnh Background

Mở file `client/src/App.css` và tìm `.app::before` để điều chỉnh:

## 1. Độ mờ của ảnh
```css
opacity: 0.8; /* Giá trị: 0.3 (mờ nhất) đến 1.0 (rõ nhất) */
```

## 2. Độ sáng
```css
filter: brightness(1.1); /* Giá trị: 0.8 (tối) đến 1.3 (sáng) */
```

## 3. Chiều cao vùng ảnh
```css
height: 45vh; /* Giá trị: 30vh (thấp) đến 60vh (cao) */
```

## 4. Vị trí ảnh
```css
background-position: center top; /* Các tùy chọn:
  - center top (hiển thị phần trên)
  - center center (hiển thị phần giữa)
  - center bottom (hiển thị phần dưới)
*/
```

## 5. Màu overlay (lớp phủ)
```css
background: linear-gradient(180deg, 
  rgba(255, 255, 255, 0.4) 0%,  /* Màu trên: trắng mờ 40% */
  rgba(255, 255, 255, 0.8) 100% /* Màu dưới: trắng mờ 80% */
),
```

### Một số màu overlay gợi ý:
- Trắng mờ: `rgba(255, 255, 255, 0.4)`
- Hồng nhạt: `rgba(255, 182, 193, 0.3)`
- Xanh nhạt: `rgba(173, 216, 230, 0.3)`
- Tím nhạt: `rgba(221, 160, 221, 0.3)`

## 6. Hiệu ứng blur (mờ)
Thêm dòng này vào `.app::before`:
```css
backdrop-filter: blur(2px); /* Giá trị: 0px - 10px */
```

## Ví dụ các style khác nhau:

### Style 1: Ảnh rõ, sáng
```css
opacity: 0.9;
filter: brightness(1.2);
height: 50vh;
```

### Style 2: Ảnh mờ, nhẹ nhàng
```css
opacity: 0.5;
filter: brightness(1.0);
height: 40vh;
backdrop-filter: blur(3px);
```

### Style 3: Ảnh đậm, nổi bật
```css
opacity: 1.0;
filter: brightness(1.1) saturate(1.2);
height: 55vh;
```
