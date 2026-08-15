# 🎨 TÀI LIỆU THIẾT KẾ GIAO DIỆN UI/UX & FIGMA DESIGN SYSTEM V5.0
## KIDS ENGLISH LEARNING AGENT — FIGMA COMPONENT & SPECIFICATION GUIDE
**Dành riêng cho Bé:** Nguyễn Ngọc Minh Anh 🦄  
**Quản trị viên & Phụ huynh:** Ba Bảo Nguyên 👨‍💼  
**Ngày phát hành:** 15/08/2026  
**Phiên bản Thiết kế:** V5.0 Figma UI Kit & Micro-Interaction System  

---

## 📑 MỤC LỤC
1. [TỔNG QUAN TƯ TƯỞNG THIẾT KẾ UI/UX (DESIGN PHILOSOPHY)](#1-tổng-quan-tư-tưởng-thiết-kế-uiux-design-philosophy)
2. [HỆ THỐNG MÀU SẮC & TYPOGRAPHY (COLOR PALETTE & TYPOGRAPHY TOKENS)](#2-hệ-thống-màu-sắc--typography-color-palette--typography-tokens)
3. [FIGMA GRID & RESPONSIVE BREAKPOINTS (MOBILE-FIRST FRAMEWORK)](#3-figma-grid--responsive-breakpoints-mobile-first-framework)
4. [FIGMA COMPONENT SYSTEM & VARIATIONS (ATOMIC DESIGN)](#4-figma-component-system--variations-atomic-design)
5. [MICRO-ANIMATIONS & HIGHLIGHT INTERACTIONS](#5-micro-animations--highlight-interactions)
6. [WIREFRAME & FIGMA SCREEN LAYOUT SPECIFICATIONS](#6-wireframe--figma-screen-layout-specifications)
7. [HƯỚNG DẪN XUẤT FILE & TRIỂN KHAI FIGMA TO CODE](#7-hướng-dẫn-xuất-file--triển-khai-figma-to-code)

---

## 1. TỔNG QUAN TƯ TƯỞNG THIẾT KẾ UI/UX (DESIGN PHILOSOPHY)

Hệ thống thiết kế giao diện **Kids English Learning Agent V5.0** tuân thủ 4 trụ cột thiết kế trải nghiệm người dùng nâng cao:

1. **Ultra-Cute Glassmorphism & Vivid Modern Dark Mode**:
   - Sử dụng nền tối đa vũ trụ `bg-[#070a12]` kết hợp các tấm nền kính mờ (`backdrop-blur-xl`), viền sáng Neon (`border-pink-500/30`, `border-cyan-400/40`) giúp bảo vệ mắt trẻ em và phụ huynh khi sử dụng học tập vào buổi tối.
2. **Kid-Friendly Touch Targets & Gamified Micro-Interactions**:
   - Mọi nút bấm đều đạt kích thước tối thiểu `44px x 44px` (Apple Human Interface Guidelines), hiệu ứng nhún nhảy (`animate-wiggle`, `scrollPopBounce`), phản hồi xúc giác nhẹ nhàng khi tương tác trên thiết bị di động.
3. **Dual-Actor Interface Switching**:
   - Chế độ trẻ em (**Bé Minh Anh**): Màu sắc tươi sáng, mascot 3D nhún nhảy, biểu tượng cỡ lớn, font chữ tròn mềm mại (`font-heading`).
   - Chế độ quản trị (**Ba Bảo Nguyên**): Bảng điều khiển sắc nét, biểu đồ tiến độ `Recharts`, bảng dữ liệu Excel dạng lưới 20 dòng/trang, đầy đủ nhật ký hệ thống.
4. **Accessible Typography & Phonics Visibility**:
   - Font chữ chuẩn Google Fonts (`Outfit` & `Inter`), kích thước từ vựng và phiên âm IPA hiển thị rõ ràng (`text-2xl` đến `text-4xl`), màu sắc tương phản cao giữa chữ và nền.

---

## 2. HỆ THỐNG MÀU SẮC & TYPOGRAPHY (COLOR PALETTE & TYPOGRAPHY TOKENS)

### 2.1 Bảng Màu Thương Hiệu & Cấp Độ Học Tập (Figma Color Tokens)

| Token Name | Hex Code | HSL Value | Mô tả & Ứng dụng |
| :--- | :--- | :--- | :--- |
| **`Primary Pink`** | `#EC4899` | `hsl(330, 81%, 60%)` | Màu chủ đạo nút bấm, mascot 🦄, hiệu ứng hoan hô |
| **`Cosmic Navy`** | `#070A12` | `hsl(225, 45%, 5%)` | Nền chung đa vũ trụ 3D (Background Base) |
| **`Neon Cyan`** | `#06B6D4` | `hsl(189, 94%, 43%)` | Nút Tra Từ Điển, Highlight IPA, Nút mở rộng |
| **`Amber Gold`** | `#F59E0B` | `hsl(38, 92%, 50%)` | Ngôi sao tích lũy ⭐, Cúp thưởng, Nút Today Plan |
| **`Emerald Success`**| `#10B981` | `hsl(158, 64%, 52%)` | Trạng thái Đã thuộc từ, Tiến độ 100%, Toast Thành công |
| **`Rose Warning`** | `#F43F5E` | `hsl(343, 89%, 60%)` | Cảnh báo sai quiz, Nút xóa dữ liệu, Thùng rác |

### 2.2 Màu Sắc Đặc Thù Cho 6 Cấp Độ Học Tập (Level Themes)

- **Level 1 (Mầm Chồi)**: `Amber/Orange` (`from-amber-500 to-orange-600`) - Rực rỡ, ấm áp.
- **Level 2 (Tiểu Học)**: `Royal Blue` (`from-blue-600 to-cyan-600`) - Tươi sáng, tin cậy.
- **Level 3 (Trung Cấp)**: `Emerald Teal` (`from-emerald-600 to-teal-600`) - Tự nhiên, sinh động.
- **Level 4 (Nâng Cao)**: `Deep Purple` (`from-purple-600 to-pink-600`) - Sáng tạo, huyền bí.
- **Level 5 (Chuyên Sâu)**: `Rose Red` (`from-rose-600 to-red-600`) - Đam mê, bứt phá.
- **Level 6 (Thần Đồng)**: `Dark Cyan` (`from-cyan-700 to-indigo-700`) - Đẳng cấp, hội nhập.

---

## 3. FIGMA GRID & RESPONSIVE BREAKPOINTS (MOBILE-FIRST FRAMEWORK)

Figma Grid Layout được thiết kế chuẩn theo 4 Breakpoints responsive:

1. **Mobile Portrait (iOS / Android)**:
   - Frame Width: `390px` (iPhone 14/15 Pro Base)
   - Columns: `4 columns`, Margin: `16px`, Gutter: `12px`
   - Bottom Nav Bar: Sticky `h-16` ở đáy màn hình.

2. **Tablet / iPad Portrait & Landscape**:
   - Frame Width: `768px` / `1024px`
   - Columns: `8 columns`, Margin: `24px`, Gutter: `16px`

3. **Desktop & Laptop**:
   - Frame Width: `1440px` (MacBook Pro / PC Wide Screen)
   - Columns: `12 columns`, Margin: `40px`, Gutter: `24px`
   - Maximum Container Width: `1280px` (`max-w-7xl`).

---

## 4. FIGMA COMPONENT SYSTEM & VARIATIONS (ATOMIC DESIGN)

### 4.1 Header Component (`Figma Component / Navigation / TopHeader`)
- **Variants**:
  - `Actor = MinhAnh` (Ẩn nút Admin CMS, hiện Star Badge).
  - `Actor = BaoNguyen` (Hiện nút CMS Studio, Audit Log, Quản trị CSDL).
  - `State = Normal / Fullscreen / MobileMenuOpen`.

### 4.2 Page Location Bar Component (`Figma Component / Navigation / PageLocationBar`)
- **Structure**:
  - Left: Icon vị trí + Breadcrumb text + Code Badge chứa URL `http://localhost:5173/#/[slug]`.
  - Right: Horizontal scrolling pills cho phép đổi nhanh giữa 10 trang phân vùng.

### 4.3 3D Vocab Zoom Modal (`Figma Component / Modals / VocabZoomModal`)
- **Structure**:
  - Background overlay: `rgba(0,0,0,0.88)` + `blur(12px)`.
  - Card Center: Border `3px border-pink-400`, Gradient Header, Large Emoji Image (`text-8xl`), Audio Pronunciation Button, IPA & Vietnamese Phonetic, Example sentence box.
  - Action Controls: Buttons `[Học Thuộc 🟢]`, `[Chưa Thuộc 🔴]`, `[Luyện Âm AI 🎤]`, `[Xem Chi Tiết 🔍]`.

---

## 5. MICRO-ANIMATIONS & HIGHLIGHT INTERACTIONS

1. **Scroll Pop & Bounce Animation**:
   - Keyframe cubic-bezier `(0.34, 1.56, 0.64, 1)` giúp các thẻ từ vựng nảy nhẹ khi cuộn tới.
2. **Fireworks & Star Burst Overlay**:
   - Hiệu ứng tràng pháo hoa nổ khi trả lời đúng 5 câu liên tiếp hoặc thuộc 10 từ vựng.
3. **Floating Mascots (Lumi & Bắp)**:
   - Các mascot hoạt hình tự động lơ lửng góc màn hình, tạo cảm giác người bạn đồng hành sống động.

---

## 6. WIREFRAME & FIGMA SCREEN LAYOUT SPECIFICATIONS

### 6.1 Màn hình 1: Trang Chủ Dashboard (`#/trang-chu`)
- **Top Section**: Header + Page Location Bar.
- **Section 1**: Streamlined Compact Home Header (Lời chúc, 3 Badge Thống kê, Progress bar target).
- **Section 2**: Launchpad 6 Phím tắt nhanh (Khóa học, Thư viện từ vựng, Game center, SRS, Today plan, AI).
- **Section 3**: Grid 6 Cấp độ học tập (L1 đến L6).

### 6.2 Màn hình 2: Thư Viện Từ Vựng (`#/thu-vien-tu-vung`)
- **Filter Bar**: Dropdown chọn Level (L1-L6), Dropdown chọn Chủ đề (90 Units), Ô tìm kiếm từ vựng.
- **Grid Layout**: 10 thẻ Flashcard / trang, hỗ trợ Flip lật mặt từ Tiếng Anh ➔ Nghĩa Tiếng Việt & Ví dụ.

### 6.3 Màn hình 3: Đấu Trường Bài Tập & Mini Games (`#/bai-tap-game`)
- **Multiple Choice Engine**: Đồng hồ đếm ngược 15 giây, 4 lựa chọn A, B, C, D kèm âm thanh và phản hồi tức thì.
- **8 Mini Games Hub**: Đập bóng bay, Memory matching, Quái vật từ vựng, Sắp xếp câu.

---

## 7. HƯỚNG DẪN XUẤT FILE & TRIỂN KHAI FIGMA TO CODE

1. **Tạo File Figma**:
   - Import toàn bộ Color Tokens & Typography Tokens từ Phần 2 vào Figma Styles.
2. **Sử Dụng Components**:
   - Kéo thả các Master Components từ Figma Kit để ráp màn hình wireframe theo đúng thứ tự Section ở Phần 6.
3. **Triển Khai Code React + TailwindCSS**:
   - Đã khớp 100% tên Class TailwindCSS với các Token đặt trong Figma (VD: `border-pink-500/30`, `bg-[#070a12]`, `glass-panel`, `animate-bounce`).
