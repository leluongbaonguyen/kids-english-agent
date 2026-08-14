# 🌟 KIDS ENGLISH LEARNING AGENT - BÉ NGUYỄN NGỌC MINH ANH 🦄

Dự án ứng dụng học Tiếng Anh độc lập (Standalone Project) dành riêng cho bé **Nguyễn Ngọc Minh Anh**, được xây dựng trên nền tảng React, Vite, Tailwind CSS và Node.js Express.

---

## 🚀 Tính Năng Nổi Bật

1. **6 Cấp Độ Từ Vựng Chi Tiết (L1 - L6)**:
   - **L1 (Khởi Động)**: Từ vựng cơ bản gần gũi.
   - **L2 (Cơ Bản)**: Mở rộng chủ đề trường học, gia đình.
   - **L3 (Mở Rộng)**: Động vật, thiên nhiên, hoạt động.
   - **L4 (Nâng Cao)**: Khoa học, giao thông, hành tinh.
   - **L5 (Tiên Phong)**: Công nghệ, kỹ năng sống.
   - **L6 (Hội Nhập Quốc Tế)**: Từ vựng giao tiếp quốc tế.

2. **Giao Diện Siêu Cu Te (Ultra-Cute UI)**:
   - Hiệu ứng 3D chuyển động mượt mà (Galaxy, Neon Waves, Aurora, Crystals, Cyber Grid).
   - Đội Pet cổ vũ đáng yêu (Kỳ lân, Gấu bông, Thỏ hồng, Vương miện công chúa).
   - Trình phát nhạc nền du dương (Background Music Player) hỗ trợ phát nhạc thư giãn, tải file MP3 từ máy tính.

3. **Chế Độ Học Tập & Đánh Giá Đa Dạng**:
   - **Poster Trực Quan**: 12 trang poster từ vựng chi tiết với hình minh họa sống động.
   - **Flashcards Tương Tác**: Thẻ từ vựng lật 3D, âm thanh giọng đọc chuẩn AI (Giọng Nam ấm & Giọng Đọc Chậm 🐢).
   - **AI Chấm Phát Âm**: Bé có thể thu âm và nghe lại giọng đọc của mình.
   - **Bài Test Đánh Giá Trình Độ (Level Up Test)**: Đạt từ 4/5 điểm trở lên để mở khóa Cấp độ tiếp theo và nhận sao ⭐.
   - **Đối Soát Từ Điển Longman**: Tra cứu phiên âm IPA, mẹo nhớ (Memory Tip) và kiến thức thú vị (Fun Fact).

4. **Hệ Thống Phân Quyền Hai Tác Nhân (Dual Actor Security)**:
   - **👧 Tác nhân Bé Minh Anh**: Giao diện học tập gọn gàng, tập trung vào học, làm bài tập và tích lũy sao ⭐.
   - **👨‍💼 Tác nhân Ba Bảo Nguyên**: Quyền Quản trị viên (Admin) đầy đủ - thêm/sửa/xóa từ vựng, mở khóa cấp độ cưỡng chế, reset tiến độ và quản lý nhạc nền/background 3D.

---

## 🛠️ Hướng Dẫn Khởi Động Dự Án

### 1. Cài đặt Dependencies:
```bash
npm install
npm install --workspace=client
npm install --workspace=server
```

### 2. Chạy Dự Án Chế Độ Phát Triển (Dev Mode):
```bash
npm run dev
```
- Frontend: `http://localhost:5174` hoặc `http://localhost:3000`
- Backend API: `http://localhost:5001`

---

## 📂 Cấu Trúc Dự Án

```
kids-english-agent/
├── client/                      # Vite + React Frontend
│   ├── src/
│   │   ├── components/         # Dashboard, Mascots, BGM Player, 3D Background
│   │   ├── constants/          # Bộ từ vựng 600+ từ & AI Knowledge Base
│   │   ├── services/           # Longman Dictionary Engine
│   │   ├── App.jsx             # Shell ứng dụng chính
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                      # Node.js Express API Backend
│   ├── src/
│   │   ├── index.js             # API routes & local store
│   │   └── store.js             # Lưu trữ tiến độ học của bé
│   └── package.json
├── package.json
└── README.md
```
