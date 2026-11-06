# Lịch thi đấu bóng đá — HTML bàn giao

Trang chủ "Lịch thi đấu & Kết quả" (VnExpress Thể Thao), đóng gói theo cấu trúc bộ HTML bàn giao `HTML-PC` (microsite Travel Award 2026).

## Cấu trúc

```
app/template/main.html   khung chung: <head>, header, footer, script  (có marker build:*)
app/page/index.html      nội dung riêng của trang                      (khối build:title / build:content)
build.js                 ghép template + page  ->  index.html
index.html               file đã ghép (bàn giao cho dev)
css/                     style.css, vds-adaptations.css
js/                      app.js (logic trang), vds-icons.js
vds-0.5.0/, vds/         VnExpress Design System (token, font, component, icon, logo)
img/channels/            logo kênh phát sóng
dev-server.js            server xem thử (file tĩnh + chuyển /api/* tới backend)
```

## Chạy thử

```bash
npm run build                                   # ghép lại index.html sau khi sửa app/
UPSTREAM=http://localhost:3000 npm start        # http://localhost:8080
```

Trang lấy dữ liệu từ backend qua các API: `GET /api/config`, `/api/fixtures?mode=live|future|past|all`, `/api/standings`, `/api/news?page=&limit=`.
`dev-server.js` chỉ chuyển tiếp `/api/*` tới `UPSTREAM`; backend không nằm trong repo này.

## Đối chiếu với chuẩn HTML-PC

| Hạng mục | Chuẩn HTML-PC | Repo này |
| --- | --- | --- |
| Template + page, marker `build:*` | Có | Có (`build.js`) |
| Đường dẫn tài nguyên tương đối (`css/…`) | Có | Có |
| SCSS biên dịch ra CSS | Có (`css/scss/**`) | Chưa: chỉ có CSS thuần |
| Mobile | `mobile_theme.css` riêng + media query | Chưa tách: media query nằm trong CSS chính |
| CSS/JS chung VnExpress (CDN `general-*.css`) | Có | Không dùng: dùng VDS 0.5.0 |
| Header `section-top-header` + myvne taskbar | Có | Không có |
| jQuery 2.1.4, swiper, lightgallery | Có | Không dùng: JS thuần |
| Token màu | Biến CSS riêng, mã hex | `--vds-*` của VDS, không hex |
| Dữ liệu | HTML tĩnh | Render bằng JS từ API |
