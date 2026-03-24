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
| Payment (planned) | VNPay Sandbox | Not yet integrated |
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
│   │   └── strapi.js         # 30+ API endpoint definitions
│   ├── context/
│   │   └── LanguageContext.jsx # i18n (vi, en, zh) via React Context
│   ├── hooks/
│   │   └── useCountUp.js     # Counter animation hook
│   ├── utils/
│   │   ├── mockData.js       # Fallback mock data
│   │   └── mockFetch.js      # Fetch interceptor for mock fallback
│   ├── components/           # 27 component directories
│   │   ├── Layout/           # Navbar, Footer, Newsletter, CtaBanner, Scroll
│   │   ├── AnimateOnScroll/  # Scroll-triggered animation wrapper
│   │   ├── PageLayout/       # Page transition wrapper (Framer Motion)
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
│   ├── page/                 # 8 page components
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
│   ├── api/                  # 21 content types (see Section 5)
│   ├── components/           # 18 reusable Strapi components
│   ├── extensions/           # Empty
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

**NOT yet implemented as routes:**
- `/tours` or `/tour/:slug` - Tour listing and detail pages
- `/booking` or `/cart` - Booking/cart/checkout flow
- `/login`, `/register` - Authentication pages
- `/profile`, `/orders` - User dashboard pages
- No chatbot widget on any page

---

## 5. Backend Content Types (21 Total)

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

### Reusable Components (18):

- **Buttons:** cta-button, nav-button, navigation-buttons, social-link, terms-and-services
- **Cards:** stacked-card
- **Members:** leader, expert, director
- **Menu Items:** contact-item, footer-menu1-item, footer-menu2-item
- **Slides:** slide, statistic-slide, timeline-events, year, partner, question

### NOT yet created as content types:
- **Tour** (collection type with name, price, duration, location, description, images, itinerary)
- **Booking/Order** (collection type with tour relation, customer, quantity, status, total price)
- **Cart** (or session-based cart)
- **Payment** (VNPay transaction records)
- **User Profile** (extended user data beyond Strapi's built-in auth)

---

## 6. Implemented Features

### Fully Working:
- Multi-language support (Vietnamese, English, Chinese) with `LanguageContext`
- All 9 frontend routes rendering with Strapi data
- API integration with Strapi (30+ endpoints configured in `config/strapi.js`)
- Mock data fallback system (`mockFetch.js` intercepts failed API calls)
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

### Partially Working:
- **Admin Content Management (3.4):** Strapi admin panel is functional for existing content types (CRUD on posts, authors, categories). However, there are no Tour or Order content types to manage yet.
- **Blog & Travel Guide (3.5):** News and Community post systems work well. Missing: category-based filtering on the archive page URL level, and "Suggested Tours" section at the bottom of posts (REQ-BLOG-05 partial).

### Not Implemented at All:
- **Tour Search & Filter (3.1):** No Tour content type in Strapi, no tour listing page, no search bar, no price range slider, no location filter
- **Tour Booking & Payment (3.2):** No booking flow, no cart, no VNPay integration, no order management
- **AI Chatbot (3.3):** No chatbot widget, no LangChain/Pinecone/Google AI integration
- **User Authentication (3.6):** No login/register pages, no user sessions on frontend, no profile page, no order history (Strapi has `users-permissions` plugin installed but unused by frontend)

---

## 7. Gap Analysis: FunctionalReg.md vs Implementation

### 3.1 Tìm kiếm và Lọc Tour Nâng cao — NOT IMPLEMENTED

| Requirement | Status | What's Needed |
|------------|--------|---------------|
| REQ-SEARCH-01: Search bar by keyword | Missing | Create Tour content type, build search UI component, wire to Strapi filter API |
| REQ-SEARCH-02: Price range slider | Missing | Add price field to Tour model, build slider component, filter API query |
| REQ-SEARCH-03: Location category filter | Missing | Add location/region field to Tour, build filter dropdown/chips |
| REQ-SEARCH-04: Results show image, name, price, duration | Missing | Create tour card component, tour listing page at `/tours` |

**Backend needed:** `Tour` content type with fields: name, slug, price, duration, location/region, description, featured_image, gallery, itinerary (rich text), highlights, included/excluded items, max_participants.

**Frontend needed:** `/tours` route, TourListPage, TourCard component, SearchBar, PriceRangeSlider, LocationFilter, TourDetailPage at `/tours/:slug`.

### 3.2 Đặt Tour và Thanh toán — NOT IMPLEMENTED

| Requirement | Status | What's Needed |
|------------|--------|---------------|
| REQ-BOOK-01: Select adult/child quantity | Missing | Booking form component with quantity selectors |
| REQ-BOOK-02: Calculate total price | Missing | Price calculation logic (adult price × qty + child price × qty) |
| REQ-BOOK-03: VNPay integration with checksum | Missing | VNPay API integration (backend route for creating payment URL) |
| REQ-BOOK-04: Save order as "Pending" | Missing | Order/Booking content type in Strapi, order creation API |

**Backend needed:** `Booking` content type (tour relation, user relation, adult_count, child_count, total_price, status enum [Pending, Paid, Cancelled], payment_ref, booking_date). Custom controller for VNPay payment URL generation and callback handling.

**Frontend needed:** BookingForm component, CartPage or BookingConfirmation page, VNPay redirect flow, OrderSuccess/OrderFail pages.

### 3.3 Trợ lý ảo AI — NOT IMPLEMENTED

| Requirement | Status | What's Needed |
|------------|--------|---------------|
| REQ-AI-01: Understand Vietnamese natural language | Missing | LangChain + Google AI Studio API integration |
| REQ-AI-02: Answer based on real data only (no hallucination) | Missing | RAG pipeline: vectorize tour data into Pinecone, retrieve context before LLM call |
| REQ-AI-03: Floating chat widget | Missing | ChatWidget component (floating bottom-right), chat message UI |

**Backend needed:** RAG service — script to vectorize Strapi tour data into Pinecone, API endpoint that receives user question, queries Pinecone for relevant context, sends prompt to Google AI Studio, returns response.

**Frontend needed:** FloatingChatWidget component, ChatWindow with message history, typing indicator, message input.

### 3.4 Quản trị Nội dung — PARTIALLY IMPLEMENTED

| Requirement | Status | What's Needed |
|------------|--------|---------------|
| REQ-ADMIN-01: Admin login to Strapi | Working | Strapi admin panel accessible at `/admin` |
| REQ-ADMIN-02: CRUD Tours and Posts | Partial | Posts CRUD works. Tour CRUD missing (no Tour content type) |
| REQ-ADMIN-03: View order list | Missing | No Order/Booking content type exists yet |

### 3.5 Blog và Hướng dẫn Du lịch — MOSTLY IMPLEMENTED

| Requirement | Status | What's Needed |
|------------|--------|---------------|
| REQ-BLOG-01: Categorize posts | Working | Posts have PostType enum and post_category relation |
| REQ-BLOG-02: List posts newest-first with pagination | Working | NewsPostArchive and CommunityPostArchive components |
| REQ-BLOG-03: Rich text display (bold, italic, headings) | Working | Strapi blocks/rich text rendered in SinglePost |
| REQ-BLOG-04: High-quality images and YouTube embeds | Partial | Images work. YouTube embed support exists in CommunityPost (iframe_url) but not in regular posts |
| REQ-BLOG-05: Related posts / suggested tours at bottom | Partial | Related posts section exists. "Suggested Tours" not possible without Tour content type |

### 3.6 Đăng nhập và Quản lý Người dùng — NOT IMPLEMENTED (MISSING FROM FunctionalReg.md)

This feature is referenced in the SRS document (Section 2.2 - User Classes) which defines Guest, Registered Customer, and Administrator roles, but was never written as a formal feature section in FunctionalReg.md. See Section 8 below for the proposed addition.

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

Phase 2 (Core Business):
  ├── 3.1 Search & Filter (depends on Tour content type)
  │     └── Frontend: SearchBar, PriceRangeSlider, LocationFilter components
  └── 3.2 Booking & Payment (depends on Auth + Tour)
        ├── Backend: Create Booking content type, VNPay integration endpoint
        └── Frontend: BookingForm, checkout flow, order confirmation pages

Phase 3 (Enhancement):
  ├── 3.3 AI Chatbot (depends on Tour data existing)
  │     ├── Backend: RAG pipeline (vectorize tours → Pinecone → LLM query endpoint)
  │     └── Frontend: FloatingChatWidget component
  └── 3.5 Blog improvements (suggested tours at post bottom)

Phase 4 (Polish):
  └── Admin order management (REQ-ADMIN-03)
  └── User order history (REQ-AUTH-05)
```

---

## 10. Key Architectural Notes

### Frontend Architecture
- **State Management:** React Context API only (no Redux/Zustand). `LanguageContext` for i18n. Will need `AuthContext` for user authentication state.
- **Data Fetching:** Native `fetch` API with mock fallback system (`mockFetch.js` intercepts `/api/` calls and returns mock data on failure).
- **Styling:** Plain CSS files per component (no CSS-in-JS, no Tailwind).
- **API Config:** All Strapi endpoints centralized in `src/config/strapi.js` with locale parameter injection.
- **Animations:** Framer Motion for page transitions (`AnimatePresence`) and scroll reveals (`AnimateOnScroll`).

### Backend Architecture
- **Pattern:** All 21 content types use Strapi's default `createCoreController` and `createCoreService` factories — zero custom business logic.
- **i18n:** All content types support internationalization (localized content).
- **Draft/Publish:** All content types have draft/publish workflow enabled.
- **API Limits:** Default 25 items/page, max 100, response includes count.
- **Custom Logic Needed For:** VNPay payment URL generation/callback (cannot be done with default Strapi CRUD), RAG chatbot endpoint, possibly custom user registration fields.

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

### External Services (Not Yet Configured)
- **VNPay Sandbox:** Needs merchant credentials, secret key, return URL config
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
| Tour System | Nothing | Content type, listing page, detail page, search, filters |
| Booking/Payment | Nothing | Content type, booking flow, VNPay integration |
| User Auth | Nothing on frontend (plugin installed on backend) | Login, register, profile, auth context, protected routes |
| AI Chatbot | Nothing | RAG pipeline, chat widget, LLM integration |
| Order Management | Nothing | Content type, admin view, user order history |
