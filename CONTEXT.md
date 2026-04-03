# TravelTVB - Project Context Document

## 1. Project Overview

**Project Name:** TravelTVB - Website hướng dẫn du lịch và cung cấp tour trực tuyến
**Team:** Nhóm 15
- 3122411237 - Phùng Anh Tuấn
- 3122411014 - Trần Hoàng Bảo
- 3122411242 - Thái Trí Văn

**Goal:** Build an e-commerce travel website with Headless CMS architecture, featuring tour search/booking, AI chatbot (RAG), and content management.

**Target Users:**
- **Guest Visitor:** Browse tours, read blog, use chatbot (no purchase history)
- **Registered Customer:** Full guest permissions + book tours, pay, view order history
- **Administrator:** Manage content and orders via Strapi Dashboard

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend Framework | React | 19.1.0 |
| Build Tool | Vite | 7.0.4 |
| Routing | React Router DOM | 7.8.0 |
| Animation | Framer Motion | 12.23.12 |
| Icons | React Icons | 5.5.0 |
| Loading States | React Loading Skeleton | 3.5.0 |
| Backend/CMS | Strapi (Headless CMS) | 5.36.0 |
| Database | SQLite (default) | better-sqlite3 12.4.1 |
| Auth Plugin | @strapi/plugin-users-permissions | 5.36.0 |
| Payment | VNPay Sandbox | Integrated (Phase 2) |
| AI/Chatbot (planned) | LangChain + Google AI Studio + Pinecone | Not yet integrated |

**Frontend env:** `VITE_STRAPI_URL=http://localhost:1337`
**Backend env:** Host `0.0.0.0`, Port `1337`, SQLite at `.tmp/data.db`

---

## 3. Project Structure

### 3.1 Frontend (`Travel_TVB/`)

```
Travel_TVB/
├── public/                    # Static assets
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Routing & layout
│   ├── config/
│   │   └── strapi.js         # 38+ API endpoint definitions
│   ├── context/
│   │   ├── LanguageContext.jsx # i18n (vi, en, zh) via React Context
│   │   └── AuthContext.jsx    # Auth state (login, register, logout, JWT)
│   ├── hooks/
│   │   └── useCountUp.js     # Counter animation hook
│   ├── utils/
│   │   ├── mockData.js       # Fallback mock data
│   │   └── mockFetch.js      # Fetch interceptor for mock fallback
│   ├── components/           # 32 component directories
│   │   ├── Layout/           # Navbar (with auth UI), Footer, Newsletter, CtaBanner, Scroll
│   │   ├── AnimateOnScroll/  # Scroll-triggered animation wrapper
│   │   ├── PageLayout/       # Page transition wrapper (Framer Motion)
│   │   ├── ProtectedRoute/   # Auth guard (redirects to /login if not authenticated)
│   │   ├── TourCard/         # Tour card (image, price, rating, region, duration)
│   │   ├── BookingForm/      # Booking form with stepper, date, contact, VNPay payment (Phase 2)
│   │   ├── PriceRangeSlider/ # Dual-handle price range slider (Phase 2)
│   │   ├── HeroSlider/       # Home hero carousel
│   │   ├── Statistic/        # Animated counter cards
│   │   ├── Commitment/       # Home commitment section
│   │   ├── Diagram/          # 3-step process visualization
│   │   ├── MainService/      # Service cards carousel
│   │   ├── Portfolio/        # Year-based project showcase
│   │   ├── FAQ/              # Accordion Q&A
│   │   ├── AboutUs-Hero/     # About hero
│   │   ├── CoreValues/       # Core values display
│   │   ├── Journey/          # Timeline component
│   │   ├── Team/             # Team sections (management, directors, experts)
│   │   ├── Service-Hero/     # Service page hero
│   │   ├── InsuranceType/    # Insurance product types
│   │   ├── ServiceContent/   # Individual service details
│   │   ├── FeatureSection/   # Reusable feature display
│   │   ├── NewsPostArchive/  # News listing with tabs, search, pagination
│   │   ├── CommunityPostArchive/ # Community posts with tabs
│   │   ├── SinglePost/       # Individual news article (audio, citations)
│   │   ├── SingleCommunityPost/ # Community post (iframe, audio)
│   │   ├── SmallPostArchive/ # Related posts sidebar
│   │   ├── NewsHeader/       # News page header
│   │   ├── CommunityHeader/  # Community page header
│   │   ├── Form/             # Contact form with slider
│   │   └── Map/              # Map display
│   ├── page/                 # 16 page components
│   │   ├── Tours/            # Tour listing with region tabs, search, sort, price slider, pagination
│   │   ├── TourDetail/       # Tour detail with hero, highlights, itinerary, BookingForm sidebar
│   │   ├── Login/            # Login page (email/username + password)
│   │   ├── Register/         # Registration page (full_name, email, username, phone, password)
│   │   ├── Profile/          # Protected profile page with user info + order history + ticket links
│   │   ├── PaymentReturn/    # VNPay payment result (success/failure) (Phase 2)
│   │   └── BookingTicket/    # E-ticket with QR code for paid bookings (Phase 2)
│   └── assets/               # Images, SVGs
├── .env
├── vite.config.js
└── package.json
```

### 3.2 Backend (`Travel_TVB_Server/`)

```
Travel_TVB_Server/
├── config/
│   ├── admin.js              # Admin JWT, API token salt
│   ├── api.js                # REST: default limit 25, max 100
│   ├── database.js           # SQLite config (supports MySQL/PostgreSQL)
│   ├── middlewares.js         # Standard Strapi middleware stack
│   ├── plugins.js            # Plugin config
│   └── server.js             # Host 0.0.0.0, port 1337
├── src/
│   ├── api/                  # 24 content types (see Section 5)
│   ├── components/           # 19 reusable Strapi components
│   ├── extensions/           # Empty (user model extended via Admin UI)
│   └── index.js              # Empty bootstrap
├── types/generated/          # Auto-generated TypeScript types
├── .env
└── package.json
```

---

## 4. Frontend Routes & Pages

| Route | Page Component | Description |
|-------|---------------|-------------|
| `/` | Home | Hero slider, statistics, commitment, diagram, portfolio, FAQ |
| `/about` | AboutUs | Hero, core values, journey timeline, team sections |
| `/service` | Service | Service hero, main services carousel, insurance types |
| `/service/:slug` | IndividualService | Individual service with features, partners, core values |
| `/contact` | Contact | Contact form with slider, map, FAQ |
| `/news` | News | Post archive with tabs (Insurance Market, Integer News, Collective), search, pagination |
| `/news/:slug` | IndividualPost | Article with audio player, related posts, citations |
| `/community` | Community | Community posts with tabs (Podcast, Analysis, Q&A), search |
| `/community/:slug` | IndividualCommunityPost | Community post with optional iframe, audio |
| `/tours` | Tours | Tour listing with region filter tabs, search, sort, price range slider, pagination (Phase 1+2) |
| `/tours/:slug` | TourDetail | Tour detail with hero image, highlights, description, itinerary, gallery, BookingForm sidebar (Phase 1+2) |
| `/login` | Login | Login form with email/username + password (Phase 1) |
| `/register` | Register | Registration form with full_name, email, username, phone, password (Phase 1) |
| `/profile` | Profile | Protected route — user info, order history with ticket links (Phase 1+2) |
| `/payment-return` | PaymentReturn | VNPay payment result page (success/failure) (Phase 2) |
| `/booking/:id/ticket` | BookingTicket | Protected route — E-ticket with QR code for paid bookings (Phase 2) |

**NOT yet implemented as routes:**
- No chatbot widget on any page (Phase 3)

---

## 5. Backend Content Types (24 Total)

### SingleType APIs (GET, PUT):

| Content Type | API Endpoint | Purpose |
|-------------|-------------|---------|
| about-core-value | `/api/about-core-value` | About page core values |
| about-hero | `/api/about-hero` | About page hero section |
| about-journey | `/api/about-journey` | About page journey timeline |
| about-team | `/api/about-team` | About page team sections |
| community-hero | `/api/community-hero` | Community page hero |
| faq | `/api/faq` | FAQ section |
| home-commitment | `/api/home-commitment` | Home commitment section |
| home-diagram | `/api/home-diagram` | Home diagram/services |
| home-hero-slider | `/api/home-hero-slider` | Home hero carousel slides |
| home-portfolio | `/api/home-portfolio` | Home portfolio section |
| home-statistic | `/api/home-statistic` | Home statistics section |
| layout-cta-banner | `/api/layout-cta-banner` | CTA banner |
| layout-footer | `/api/layout-footer` | Footer content |
| layout-navbar | `/api/layout-navbar` | Navbar configuration |
| layout-newsletter | `/api/layout-newsletter` | Newsletter section |
| news-hero | `/api/news-hero` | News page hero |
| service-hero | `/api/service-hero` | Service page hero |

### CollectionType APIs (Full CRUD):

| Content Type | API Endpoint | Purpose |
|-------------|-------------|---------|
| author | `/api/authors` | Blog post authors |
| post-category | `/api/post-categories` | Blog post categories |
| single-post | `/api/single-posts` | Blog articles |
| single-community-post | `/api/single-community-posts` | Community posts |
| tour | `/api/tours` | Tour listings (Phase 1) |
| tour-category | `/api/tour-categories` | Tour categories (Phase 1) |
| booking | `/api/bookings` | Tour bookings with VNPay payment (Phase 2) |

### Custom API Routes (Booking):

| Method | Endpoint | Auth | Purpose |
|--------|---------|------|---------|
| POST | `/api/bookings` | Authenticated | Create booking (concurrency-safe with knex transaction) |
| POST | `/api/bookings/create-payment-url` | Authenticated | Generate VNPay payment URL (HMAC SHA512) |
| GET | `/api/bookings/vnpay-return` | Public | VNPay callback — verify checksum, update status, redirect |
| GET | `/api/bookings/my-bookings` | Authenticated | Get current user's booking history |

### Reusable Components (19):

- **Buttons:** cta-button, nav-button, navigation-buttons, social-link, terms-and-services
- **Cards:** stacked-card, tour-highlight (Phase 1)
- **Members:** leader, expert, director
- **Menu Items:** contact-item, footer-menu1-item, footer-menu2-item
- **Slides:** slide, statistic-slide, timeline-events, year, partner, question

### User Model (Extended via Admin UI):
Built-in Strapi `users-permissions` User model extended with: `full_name` (string), `phone` (string)

### Booking Schema Fields (Phase 2):
`tour` (relation to Tour), `user` (relation to User), `adult_count`, `child_count`, `travel_date`, `total_price` (biginteger VND), `status` (enum: Pending/Paid/Failed/Cancelled), `payment_ref`, `vnpay_transaction_no`, `booking_date`, `contact_name`, `contact_email`, `contact_phone`. No i18n, no draft/publish. Relations stored in Strapi 5 link tables (`bookings_tour_lnk`, `bookings_user_lnk`).

---

## 6. Implemented Features

### Fully Working:
- Multi-language support (Vietnamese, English, Chinese) with `LanguageContext`
- All 16 frontend routes rendering with Strapi data
- API integration with Strapi (38+ endpoints configured in `config/strapi.js`)
- Mock data fallback system (`mockFetch.js` intercepts failed API calls) with client-side filtering for tour mock data
- Framer Motion page transitions and scroll animations
- Contact form submission (POST to `/api/form-submissions`)
- Newsletter email subscription (POST to `/api/newsletter-email-submissons`)
- News/Community post listing with tab filtering, search, and pagination
- Individual post pages with audio player, citations, and related posts
- Responsive design with mobile burger menu
- Skeleton loading states
- Auto-rotating carousels (hero, services, portfolio partners)
- FAQ accordion
- Animated counters (statistics section)
- **User Authentication (3.6):** Login, register, profile pages with JWT auth via Strapi `users-permissions` plugin. AuthContext manages state. Navbar shows Login/Register for guests, user dropdown (Profile/Logout) for authenticated users. Protected routes redirect to `/login`. (Phase 1)
- **Tour System (3.1):** Tour and Tour-Category content types in Strapi with full schema (name, slug, price/child_price in VND, duration, region, location, transport, highlights, rich text description/itinerary, gallery, rating). Tour listing page with region filter tabs, keyword search, price range slider, sort (price/rating/newest), pagination. Tour detail page with hero image, highlights, rich text content, image gallery, BookingForm sidebar. (Phase 1+2)
- **Tour Booking & Payment (3.2):** Full booking flow with VNPay Sandbox integration. BookingForm with adult/child stepper, date picker, contact info, auto-calculated VND total. Concurrency-safe booking creation via knex transaction (checks Max_Participants, rolls back if full). VNPay HMAC SHA512 signed payment URL generation, callback verification, automatic status update (Pending→Paid/Failed). PaymentReturn page shows success/failure. (Phase 2)
- **User Order History (3.6 REQ-AUTH-05):** Profile page shows booking history with tour name, date, guests, total, status badges (Pending/Paid/Failed/Cancelled). "View Ticket" button on paid orders links to e-ticket page. (Phase 2)
- **E-Ticket System:** BookingTicket page with styled ticket layout, QR code (via free API), booking reference, print button. (Phase 2)

### Partially Working:
- **Admin Content Management (3.4):** Strapi admin panel is functional for all content types including Tours and Bookings (CRUD). Bookings visible in admin with status tracking.
- **Blog & Travel Guide (3.5):** News and Community post systems work well. Missing: "Suggested Tours" section at the bottom of posts (REQ-BLOG-05 partial).

### Not Implemented at All:
- **AI Chatbot (3.3):** No chatbot widget, no LangChain/Pinecone/Google AI integration (Phase 3)

---

## 7. Gap Analysis: FunctionalReg.md vs Implementation

### 3.1 Tìm kiếm và Lọc Tour Nâng cao — MOSTLY IMPLEMENTED (Phase 1)

| Requirement | Status | What's Needed |
|------------|--------|---------------|
| REQ-SEARCH-01: Search bar by keyword | **Done** | Keyword search on Tour_Name implemented in Tours page |
| REQ-SEARCH-02: Price range slider | **Done** | Dual-handle PriceRangeSlider component integrated in Tours page (Phase 2) |
| REQ-SEARCH-03: Location category filter | **Done** | Region filter tabs (MienBac/MienTrung/MienNam/TayNguyen/NhieuVung) |
| REQ-SEARCH-04: Results show image, name, price, duration | **Done** | TourCard component shows all required fields + rating |

### 3.2 Đặt Tour và Thanh toán — FULLY IMPLEMENTED (Phase 2)

| Requirement | Status | What's Needed |
|------------|--------|---------------|
| REQ-BOOK-01: Select adult/child quantity | **Done** | BookingForm with +/- steppers for adults and children |
| REQ-BOOK-02: Calculate total price | **Done** | Auto-calculated: (adults × Price) + (children × Child_Price) |
| REQ-BOOK-03: VNPay integration with checksum | **Done** | HMAC SHA512 signed payment URL, callback verification |
| REQ-BOOK-04: Save order as "Pending" | **Done** | Concurrency-safe booking creation via knex transaction |

### 3.3 Trợ lý ảo AI — NOT IMPLEMENTED

| Requirement | Status | What's Needed |
|------------|--------|---------------|
| REQ-AI-01: Understand Vietnamese natural language | Missing | LangChain + Google AI Studio API integration |
| REQ-AI-02: Answer based on real data only (no hallucination) | Missing | RAG pipeline: vectorize tour data into Pinecone, retrieve context before LLM call |
| REQ-AI-03: Floating chat widget | Missing | ChatWidget component (floating bottom-right), chat message UI |

**Backend needed:** RAG service — script to vectorize Strapi tour data into Pinecone, API endpoint that receives user question, queries Pinecone for relevant context, sends prompt to Google AI Studio, returns response.

**Frontend needed:** FloatingChatWidget component, ChatWindow with message history, typing indicator, message input.

### 3.4 Quản trị Nội dung — FULLY IMPLEMENTED

| Requirement | Status | What's Needed |
|------------|--------|---------------|
| REQ-ADMIN-01: Admin login to Strapi | **Done** | Strapi admin panel accessible at `/admin` |
| REQ-ADMIN-02: CRUD Tours and Posts | **Done** | Posts, Tours, and Bookings CRUD all functional in Strapi admin |
| REQ-ADMIN-03: View order list | **Done** | Bookings collection visible in Strapi admin with status tracking |

### 3.5 Blog và Hướng dẫn Du lịch — MOSTLY IMPLEMENTED

| Requirement | Status | What's Needed |
|------------|--------|---------------|
| REQ-BLOG-01: Categorize posts | Working | Posts have PostType enum and post_category relation |
| REQ-BLOG-02: List posts newest-first with pagination | Working | NewsPostArchive and CommunityPostArchive components |
| REQ-BLOG-03: Rich text display (bold, italic, headings) | Working | Strapi blocks/rich text rendered in SinglePost |
| REQ-BLOG-04: High-quality images and YouTube embeds | Partial | Images work. YouTube embed support exists in CommunityPost (iframe_url) but not in regular posts |
| REQ-BLOG-05: Related posts / suggested tours at bottom | Partial | Related posts section exists. "Suggested Tours" not possible without Tour content type |

### 3.6 Đăng nhập và Quản lý Người dùng — MOSTLY IMPLEMENTED (Phase 1)

This feature was added to FunctionalReg.md as Section 3.6. Implementation completed in Phase 1.

| Requirement | Status | What's Needed |
|------------|--------|---------------|
| REQ-AUTH-01: Register with email, password, full_name, phone | **Done** | Register page + Strapi users-permissions |
| REQ-AUTH-02: Login with email/password, return JWT | **Done** | Login page + AuthContext |
| REQ-AUTH-03: Password hashing | **Done** | Handled by Strapi users-permissions plugin |
| REQ-AUTH-04: Profile page | **Done** | Profile page showing user info |
| REQ-AUTH-05: Order history page | **Done** | Profile page shows booking history with status badges + e-ticket links (Phase 2) |
| REQ-AUTH-06: Navbar auth state | **Done** | Guest: Login/Register buttons; Logged in: user dropdown |

---

## 8. Proposed Addition to FunctionalReg.md: Section 3.6

The following feature section should be added to FunctionalReg.md:

### 3.6 Tính năng: Đăng nhập và Quản lý Người dùng

**3.6.1 Mô tả và Mức độ ưu tiên**

Cho phép người dùng đăng ký tài khoản, đăng nhập, và quản lý thông tin cá nhân. Đây là tiền đề bắt buộc cho tính năng Đặt Tour (3.2) vì chỉ người dùng đã đăng nhập mới có thể đặt tour và xem lịch sử đơn hàng.

Mức độ ưu tiên: **High (Cao)** — Là điều kiện tiên quyết cho Booking Engine.

**3.6.2 Chuỗi Kích thích/Phản hồi**

- **Đăng ký:** User nhấn "Đăng ký" → Nhập email, mật khẩu, họ tên, số điện thoại → Hệ thống tạo tài khoản → Chuyển hướng về trang chủ (đã đăng nhập).
- **Đăng nhập:** User nhấn "Đăng nhập" → Nhập email và mật khẩu → Hệ thống xác thực → Trả về JWT token → Cập nhật Navbar (hiển thị tên user thay vì nút Đăng nhập).
- **Xem hồ sơ:** User đã đăng nhập nhấn vào tên mình → Hệ thống hiển thị trang Profile với thông tin cá nhân và lịch sử đơn hàng.
- **Đăng xuất:** User nhấn "Đăng xuất" → Hệ thống xóa JWT token → Chuyển về trạng thái Guest.

**3.6.3 Yêu cầu Chức năng**

- **REQ-AUTH-01:** Hệ thống phải cho phép đăng ký tài khoản bằng email, mật khẩu, họ tên, và số điện thoại.
- **REQ-AUTH-02:** Hệ thống phải cho phép đăng nhập bằng email và mật khẩu, trả về JWT token.
- **REQ-AUTH-03:** Mật khẩu phải được mã hóa (hash) trước khi lưu vào database (Strapi users-permissions plugin handles this).
- **REQ-AUTH-04:** Hệ thống phải có trang Profile hiển thị thông tin cá nhân của người dùng đã đăng nhập.
- **REQ-AUTH-05:** Hệ thống phải có trang Lịch sử Đơn hàng cho người dùng đã đăng nhập.
- **REQ-AUTH-06:** Navbar phải thay đổi hiển thị dựa trên trạng thái đăng nhập (Guest: nút Đăng nhập/Đăng ký; Logged in: tên user + dropdown menu).

**Implementation notes:** Strapi's `@strapi/plugin-users-permissions` is already installed in the backend. It provides `/api/auth/local/register`, `/api/auth/local` (login), and `/api/users/me` endpoints out of the box. The frontend needs to build the UI and store the JWT token (localStorage/context).

---

## 9. Implementation Priority & Dependency Chain

Based on the FunctionalReg.md requirements and current state, here is the recommended implementation order:

```
Phase 1 (Foundation):
  ├── 3.6 User Auth (prerequisite for booking)
  │     ├── Backend: Configure Strapi users-permissions, extend user model
  │     └── Frontend: Login, Register, Profile pages, AuthContext, protected routes
  └── 3.1 Tour System (prerequisite for search, booking, and chatbot)
        ├── Backend: Create Tour content type in Strapi, populate sample data
        └── Frontend: Tour listing page, tour detail page, tour card component

Phase 2 (Core Business): ✅ COMPLETED
  ├── 3.1 Search & Filter — PriceRangeSlider integrated
  ├── 3.2 Booking & Payment — Full VNPay Sandbox integration
  ├── 3.4 Admin order management — Bookings visible in Strapi admin
  ├── 3.6 User order history — Profile shows bookings + e-ticket links
  └── E-Ticket system — QR code ticket for paid bookings

Phase 3 (Enhancement): NEXT
  ├── 3.3 AI Chatbot (depends on Tour data existing)
  │     ├── Backend: RAG pipeline (vectorize tours → Pinecone → LLM query endpoint)
  │     └── Frontend: FloatingChatWidget component
  └── 3.5 Blog improvements (suggested tours at post bottom)
```

---

## 10. Key Architectural Notes

### Frontend Architecture
- **State Management:** React Context API only (no Redux/Zustand). `LanguageContext` for i18n, `AuthContext` for authentication (JWT in localStorage, token validation on mount, login/register/logout functions).
- **Data Fetching:** Native `fetch` API with mock fallback system (`mockFetch.js` intercepts `/api/` calls and returns mock data on failure).
- **Styling:** Plain CSS files per component (no CSS-in-JS, no Tailwind).
- **API Config:** All Strapi endpoints centralized in `src/config/strapi.js` with locale parameter injection.
- **Animations:** Framer Motion for page transitions (`AnimatePresence`) and scroll reveals (`AnimateOnScroll`).

### Backend Architecture
- **Pattern:** 23 of 24 content types use Strapi's default factories. The **Booking** content type has a custom controller with concurrency-safe creation (knex transactions), VNPay HMAC SHA512 payment URL generation, and callback verification. Strapi 5 uses snake_case DB columns and separate link tables for relations (`bookings_tour_lnk`, `bookings_user_lnk`).
- **i18n:** All content types support internationalization (localized content).
- **Draft/Publish:** All content types have draft/publish workflow enabled.
- **API Limits:** Default 25 items/page, max 100, response includes count.
- **Custom Logic Implemented:** VNPay payment URL generation/callback in Booking custom controller. User registration fields (`full_name`, `phone`) handled via Strapi plugin config + Admin UI field extension.
- **Custom Logic Still Needed:** RAG chatbot endpoint (Phase 3).

### Current Domain Mismatch
The current frontend and backend content appears to be styled as an **insurance/corporate portfolio website**, not a travel tour website. The "Service" pages reference insurance products, and the content structure reflects a corporate website. This will need to be adapted or the tour features built alongside the existing content structure.

---

## 11. Environment & Development

### Running the Project
```bash
# Backend (Strapi)
cd Travel_TVB_Server
npm install
npm run dev          # Starts at http://localhost:1337

# Frontend (React + Vite)
cd Travel_TVB
npm install
npm run dev          # Starts at http://localhost:5173 (default Vite port)
```

### Key Environment Variables
**Backend (.env):**
- `HOST`, `PORT` — Server binding
- `APP_KEYS` — Application signing keys
- `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET` — Auth secrets
- `DATABASE_CLIENT`, `DATABASE_FILENAME` — DB config

**Frontend (.env):**
- `VITE_STRAPI_URL` — Backend API base URL
- `VITE_STRAPI_API_TOKEN` — Strapi full-access API token

**Backend (.env) — VNPay (Phase 2):**
- `VNPAY_TMN_CODE` — Merchant terminal code (`6UH2PIXS`)
- `VNPAY_HASH_SECRET` — HMAC secret key for checksum
- `VNPAY_URL` — Sandbox payment URL
- `VNPAY_RETURN_URL` — Callback URL (`http://localhost:1337/api/bookings/vnpay-return`)
- `FRONTEND_URL` — Frontend URL for redirect after payment (`http://localhost:5173`)

### External Services
- **VNPay Sandbox:** Fully configured and working (Phase 2). Test card: `9704198526191432198`, holder `NGUYEN VAN A`, date `07/15`, OTP `123456`
- **Google AI Studio:** Needs API key for LLM calls
- **Pinecone:** Needs API key, environment, index name for vector storage
- **LangChain:** Orchestration library, no API key needed (uses above services)

---

## 12. Summary: What Exists vs What's Needed

| Area | Exists | Needs Building |
|------|--------|----------------|
| Homepage | Full (hero, stats, commitment, diagram, portfolio, FAQ) | - |
| About Page | Full (hero, core values, journey, team) | - |
| Service Page | Full (insurance-focused) | Adapt for tours or keep as-is |
| Contact Page | Full (form, map, FAQ) | - |
| News/Blog | Full (listing, detail, audio, search, pagination) | YouTube embed in regular posts, suggested tours |
| Community | Full (listing, detail, tabs, iframe support) | - |
| Multi-language | Full (vi, en, zh) | Extend to new pages/components |
| Tour System | **Phase 1+2 Complete** (content type, listing, detail, search, region filter, price slider, sort) | - |
| Booking/Payment | **Phase 2 Complete** (booking form, VNPay integration, concurrency control, payment flow) | - |
| User Auth | **Phase 1+2 Complete** (login, register, profile, JWT, order history, e-tickets) | - |
| AI Chatbot | Nothing | RAG pipeline, chat widget, LLM integration (Phase 3) |
| Order Management | **Phase 2 Complete** (Strapi admin view, user order history, e-ticket with QR) | - |

---

## 13. Development History

### Phase 1 — Foundation: Auth + Tour System (2026-03-24)

#### Track A: User Authentication (Feature 3.6)

**Backend changes:**
- `Travel_TVB_Server/config/plugins.js` — Configured `users-permissions` plugin: JWT expiry set to 7 days, allowed `full_name` and `phone` as registration fields
- **Strapi Admin UI** — Added `full_name` (Short text) and `phone` (Short text) fields to the User content type via Content-Type Builder (Note: extending via `src/extensions/users-permissions/content-types/user/schema.json` caused 500 errors in Strapi 5 — the admin UI approach works correctly)
- **Strapi Admin UI** — Configured permissions: Public role gets `callback` + `register` on Auth; Authenticated role gets `me` on User

**Frontend files created:**
- `Travel_TVB/src/context/AuthContext.jsx` — AuthProvider with `login()`, `register()`, `logout()` functions, JWT stored in localStorage, token validation on mount via `/api/users/me`, exports `useAuth()` hook
- `Travel_TVB/src/components/ProtectedRoute/ProtectedRoute.jsx` — Wrapper that redirects unauthenticated users to `/login`
- `Travel_TVB/src/page/Login/Login.jsx` + `Login.css` — Login page with email/username + password form, tri-lingual displayData (vi/en/zh), Framer Motion animation
- `Travel_TVB/src/page/Register/Register.jsx` + `Register.css` — Registration page with full_name, email, username, phone, password, confirmPassword fields, two-column layout, password match validation
- `Travel_TVB/src/page/Profile/Profile.jsx` + `Profile.css` — Protected profile page showing user info (full_name, email, username, phone, member since date), avatar initial, logout button

**Frontend files modified:**
- `Travel_TVB/src/components/Layout/Navbar/Home-Navbar.jsx` — Added `useAuth()` integration, user dropdown menu (Profile/Logout) when authenticated, Login/Register buttons when guest, mobile menu auth section, click-outside handler for user dropdown
- `Travel_TVB/src/components/Layout/Navbar/Home-Navbar.css` — Added styles for `.auth-buttons`, `.auth-nav-link`, `.auth-nav-btn`, `.user-menu`, `.user-menu-toggle`, `.user-avatar-small`, `.user-display-name`, `.user-dropdown`, `.user-dropdown-item`, `.mobile-auth-section`

#### Track B: Tour Content System (Feature 3.1 Foundation)

**Backend files created:**
- `Travel_TVB_Server/src/components/card/tour-highlight.json` — Reusable Strapi component with `Highlight_Text` (string) and `Highlight_Icon` (media)
- `Travel_TVB_Server/src/api/tour-category/` — Full CollectionType: `schema.json` (Category_Name, Category_Slug uid, tours relation), `controllers/tour-category.js`, `services/tour-category.js`, `routes/tour-category.js`
- `Travel_TVB_Server/src/api/tour/` — Full CollectionType: `schema.json`, `controllers/tour.js`, `services/tour.js`, `routes/tour.js`

**Tour schema fields:** `Tour_Name`, `slug` (uid), `Short_Description` (text), `Description` (blocks/rich text), `Featured_Image` (single media), `Gallery` (multiple media), `Price` (biginteger for VND), `Original_Price` (biginteger), `Duration_Days` (integer), `Duration_Nights` (integer), `Region` (enum: MienBac/MienTrung/MienNam/TayNguyen/NhieuVung), `Location` (string), `Departure_Location` (string), `Itinerary` (blocks), `Highlights` (repeatable tour-highlight component), `Max_Participants` (integer), `Rating` (decimal), `Review_Count` (integer), `Transport_Type` (enum: XeKhach/MayBay/Tau/XeMay/KetHop), `Is_Featured` (boolean), `tour_category` (manyToOne relation). All localized fields support i18n. Draft/publish enabled.

**Frontend files created:**
- `Travel_TVB/src/components/TourCard/TourCard.jsx` + `TourCard.css` — Tour card component displaying featured image, region badge, SALE badge (if discounted), category, title, description, duration (3N2D format), location, rating with stars, price in VND format with strikethrough original price. Uses regionLabels and transportLabels mapped per locale.
- `Travel_TVB/src/page/Tours/Tours.jsx` + `Tours.css` — Tour listing page with: light blue mesh hero (matching site-wide pattern: `linear-gradient(180deg, #d1e6fc, #fffff6)` + 40px grid overlay), region filter tabs (All/Northern/Central/Southern/Highlands/Multi-Region), search input, sort dropdown (Newest/Price Low-High/Price High-Low/Highest Rated), TourCard grid (3 columns responsive), pagination. Client-side filtering/sorting added as fallback for mock data.
- `Travel_TVB/src/page/TourDetail/TourDetail.jsx` + `TourDetail.css` — Tour detail page with: full-width hero image with title overlay, two-column layout (main content: highlights with check icons, rich text description, rich text itinerary, image gallery grid; sticky sidebar: price box with discount display, duration, departure location, transport type, max participants, rating, "Book Now" and "Contact Us" CTA buttons). Includes `renderContent()` for Strapi blocks (paragraph, heading, list, image).

**Frontend files modified:**
- `Travel_TVB/src/config/strapi.js` — Added endpoints: `AUTH_LOCAL`, `AUTH_REGISTER`, `USERS_ME`, `TOURS`, `TOUR_CATEGORIES`
- `Travel_TVB/src/utils/mockData.js` — Added 6 mock tours (Ha Long Bay, Sapa, Hue-Da Nang-Hoi An, Phu Quoc, Da Lat, Vietnam North to South) across all regions with highlights, and 5 tour categories
- `Travel_TVB/src/App.jsx` — Wrapped app in `<AuthProvider>`, added 5 new routes: `/tours`, `/tours/:slug`, `/login`, `/register`, `/profile` (protected)
- `Travel_TVB/.env` — Added `VITE_STRAPI_API_TOKEN`

#### Bug Fixes & Adjustments
- **Strapi 500 error fix:** Removed `src/extensions/users-permissions/` directory — Strapi 5 does not support partial user schema overrides via extension files. Custom user fields (`full_name`, `phone`) added via Strapi Admin Content-Type Builder instead.
- **Node.js version:** Switched from Node 20.18.0 to Node 22.16.0 via nvm, rebuilt `better-sqlite3` native module to match.
- **Tour filtering fix:** Added client-side filtering/sorting in `Tours.jsx` to handle mock data fallback (mockFetch.js returns all data regardless of query params).
- **Tour detail page:** Set `padding-top: 5rem` (user-adjusted), hidden "Back to tours" button via `display: none`.
- **Tours page hero:** Changed from dark gradient to light blue mesh pattern (`#d1e6fc` to `#fffff6` with 40px grid overlay) to match the site-wide hero style used on About, Service, News, and Community pages.

#### Strapi Admin Configuration (Manual Steps Completed)
- Public role: enabled `callback`, `register` (Auth); `find`, `findOne` (Tour); `find` (Tour-Category)
- Authenticated role: enabled `me` (User)
- User content type: added `full_name` and `phone` fields via Content-Type Builder

---

### Phase 2 — Booking & Payment + Search Enhancement (2026-03-24)

#### Track A: Booking & Payment System (Feature 3.2)

**Backend files created:**
- `Travel_TVB_Server/src/api/booking/content-types/booking/schema.json` — Booking CollectionType: tour relation (via `bookings_tour_lnk`), user relation (via `bookings_user_lnk`), `adult_count`, `child_count`, `travel_date`, `total_price` (biginteger VND), `status` (enum: Pending/Paid/Failed/Cancelled), `payment_ref`, `vnpay_transaction_no`, `booking_date`, `contact_name`, `contact_email`, `contact_phone`. No i18n, no draft/publish.
- `Travel_TVB_Server/src/api/booking/controllers/booking.js` — **First custom controller in the project.** Four methods:
  - `create` (override) — Concurrency-safe: wraps capacity check + insert in a knex transaction. Queries `bookings_tour_lnk` join to count booked participants for tour+date, checks against `max_participants`, calculates total from `price`/`child_price`, rolls back if capacity exceeded. Inserts into `bookings` table + link tables (`bookings_tour_lnk`, `bookings_user_lnk`). Generates `document_id` via `crypto.randomUUID()` (Strapi 5 requirement).
  - `createPaymentUrl` — Receives `bookingId`, builds VNPay param object, sorts with VNPay's official `sortObject` (encodeURIComponent on keys+values, `%20`→`+`), signs with HMAC SHA512 using `qs.stringify({ encode: false })`, returns full payment URL.
  - `vnpayReturn` — Receives VNPay redirect query params, verifies HMAC SHA512 checksum, extracts bookingId from `vnp_TxnRef`, updates booking status to Paid (code "00") or Failed, redirects to frontend `/payment-return?status=...&bookingId=...`.
  - `myBookings` — Fetches authenticated user's bookings via `bookings_user_lnk` join, enriches with tour names via `bookings_tour_lnk` join.
- `Travel_TVB_Server/src/api/booking/services/booking.js` — Default core service
- `Travel_TVB_Server/src/api/booking/routes/01-custom-booking.js` — Custom routes (named `01-` to load before default routes and prevent `:id` catching): `POST /bookings/create-payment-url` (authenticated), `GET /bookings/vnpay-return` (public, `auth: false`), `GET /bookings/my-bookings` (authenticated)
- `Travel_TVB_Server/src/api/booking/routes/booking.js` — Explicit CRUD routes (replaced `createCoreRouter` to prevent `GET /bookings/:id` from catching custom paths)

**Backend files modified:**
- `Travel_TVB_Server/src/api/tour/content-types/tour/schema.json` — Added `Child_Price` (biginteger, i18n localized) for per-tour child pricing
- `Travel_TVB_Server/.env` — Added `VNPAY_TMN_CODE=6UH2PIXS`, `VNPAY_HASH_SECRET`, `VNPAY_URL`, `VNPAY_RETURN_URL=http://localhost:1337/api/bookings/vnpay-return`, `FRONTEND_URL=http://localhost:5173`

**Frontend files created:**
- `Travel_TVB/src/components/BookingForm/BookingForm.jsx` + `BookingForm.css` — Embedded in TourDetail sidebar. Shows price per adult/child, +/- steppers, date picker (min=tomorrow), contact info pre-filled from auth user, auto-calculated VND total, "Pay with VNPay" button. Requires login (shows "Login to book" for guests). Two-step submit: POST booking → POST create-payment-url → redirect to VNPay.
- `Travel_TVB/src/page/PaymentReturn/PaymentReturn.jsx` + `PaymentReturn.css` — Reads `?status=success&bookingId=X` from URL. Success: green check icon, booking reference, "View My Bookings" link. Failed: red X icon, "Try Again" link. Light blue mesh background matching site style.
- `Travel_TVB/src/components/PriceRangeSlider/PriceRangeSlider.jsx` + `PriceRangeSlider.css` — Dual-handle range slider using two overlaid `<input type="range">` elements. Custom CSS thumb styling, VND formatted labels (e.g. "2M ₫"), 100K step. No external library.
- `Travel_TVB/src/page/BookingTicket/BookingTicket.jsx` + `BookingTicket.css` — E-ticket page for paid bookings. Styled ticket card with dark header (company name + "Paid" badge), notch divider, tour details grid, total paid, QR code (via `api.qrserver.com`, encodes verification URL), booking reference. Print button (`window.print()`) with print-specific CSS that hides UI chrome.

**Frontend files modified:**
- `Travel_TVB/src/config/strapi.js` — Added `BOOKINGS`, `BOOKING_CREATE_PAYMENT`, `BOOKING_MY_BOOKINGS` endpoints
- `Travel_TVB/src/page/TourDetail/TourDetail.jsx` — Imported `BookingForm`, replaced static "Book Now"/"Contact Us" CTA links with `<BookingForm tour={tour} />` in sidebar
- `Travel_TVB/src/page/Tours/Tours.jsx` — Added `PriceRangeSlider` import, `priceRange` state, price filter in API query (`filters[Price][$gte]`/`[$lte]`), client-side price filter fallback, `handlePriceChange` handler, slider placed in controls section
- `Travel_TVB/src/page/Tours/Tours.css` — (no structural changes needed, slider self-contained)
- `Travel_TVB/src/page/Profile/Profile.jsx` — Complete rewrite: added `useEffect` to fetch bookings from `/api/bookings/my-bookings` with JWT, order history section with cards showing tour name (linked), travel date, guests, total price, status badge (Pending=yellow, Paid=green, Failed=red, Cancelled=grey), "View Ticket" button on paid orders linking to `/booking/:id/ticket`
- `Travel_TVB/src/page/Profile/Profile.css` — Changed layout to vertical column, added `.profile-orders-container`, `.profile-order-card`, `.profile-order-details`, status badge styles, `.profile-ticket-btn`
- `Travel_TVB/src/App.jsx` — Added imports for `PaymentReturn` and `BookingTicket`, added routes: `/payment-return` (public), `/booking/:id/ticket` (protected)

#### Bug Fixes & Debugging (VNPay Integration)

- **Strapi 5 DB schema mismatch:** Initial custom controller used PascalCase column names (`Tour_Name`, `Max_Participants`, `tour_id` on bookings). Strapi 5 uses snake_case (`tour_name`, `max_participants`) and separate link tables for relations (`bookings_tour_lnk`, `bookings_user_lnk`). Fixed by querying actual SQLite schema via `pragma('table_info(...)`)` and rewriting all knex queries.
- **VNPay signature error (code 70):** Required 4 iterations to fix:
  1. Initial `sortObject` used `encodeURIComponent` on values — VNPay rejected (wrong encoding)
  2. Switched to `qs.stringify({ encode: false })` with raw values — still rejected
  3. Switched to `URLSearchParams` — encoded spaces as `+` but VNPay expected `%20` — still rejected
  4. **Fix:** Used VNPay's exact official `sortObject` from their GitHub demo: encodes both keys AND values with `encodeURIComponent`, replaces `%20` with `+`, then `qs.stringify({ encode: false })` for both signing and URL construction. This is counterintuitive (encode before stringify with encode:false) but matches VNPay's server-side verification.
- **Wrong HashSecret cached:** After updating `.env` with the correct secret, Strapi continued using the old secret from memory. Required full process kill (`npx kill-port 1337`) and restart — Strapi's hot reload doesn't re-read `.env`.
- **VNPay callback 403 Forbidden:** Custom route `GET /bookings/vnpay-return` with `auth: false` was being caught by the default core router's `GET /bookings/:id` pattern (treating "vnpay-return" as an ID). Fixed by: (1) renaming custom routes file to `01-custom-booking.js` for alphabetical priority, (2) replacing `createCoreRouter` in `booking.js` with explicit route definitions to control matching order.

#### Strapi Admin Configuration (Manual Steps Completed)
- Authenticated role: enabled `create` on Booking, `createPaymentUrl`, `myBookings`
- Public role: enabled `vnpayReturn` on Booking

#### VNPay Sandbox Credentials
- Terminal ID: `6UH2PIXS`
- HashSecret: stored in `Travel_TVB_Server/.env`
- Sandbox URL: `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html`
- Test card: NCB bank, number `9704198526191432198`, holder `NGUYEN VAN A`, date `07/15`, OTP `123456`
- Admin portal: `https://sandbox.vnpayment.vn/merchantv2/`

#### What Remains for Phase 3
- **AI Chatbot (3.3):** RAG pipeline (LangChain + Google AI Studio + Pinecone), floating chat widget
- **Blog improvements (3.5):** Suggested tours at bottom of posts
