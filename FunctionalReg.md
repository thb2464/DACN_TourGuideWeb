3\. Các Tính Năng Hệ Thống 3.1 Tính năng: Tìm kiếm và Lọc Tour Nâng cao
3.1.1 Mô tả và Mức độ ưu tiên Cho phép người dùng tìm tour theo địa
điểm, giá, và thời gian. Mức độ ưu tiên: High (Cao) - Đây là chức năng
cốt lõi để bán hàng. 3.1.2 Chuỗi Kích thích/Phản hồi User chọn bộ lọc
\"Miền Bắc\" và khoảng giá \"2-5 triệu\". Hệ thống gọi API tới Strapi
với tham số filter. Hệ thống hiển thị danh sách tour thỏa mãn điều kiện.
3.1.3 Yêu cầu Chức năng REQ-SEARCH-01: Hệ thống phải cung cấp thanh tìm
kiếm theo từ khóa (tên tour). REQ-SEARCH-02: Hệ thống phải cung cấp bộ
lọc theo khoảng giá (Price Range Slider). REQ-SEARCH-03: Hệ thống phải
cung cấp bộ lọc theo địa điểm (Location Category). REQ-SEARCH-04: Kết
quả tìm kiếm phải hiển thị: Hình ảnh, Tên tour, Giá tiền, Đánh giá Tour
(Mở rộng) và Thời lượng.

3.2 Tính năng: Đặt Tour và Thanh toán 3.2.1 Mô tả và Mức độ ưu tiên Quy
trình từ lúc chọn tour đến khi thanh toán thành công. Mức độ ưu tiên:
High (Cao). 3.2.2 Chuỗi Kích thích/Phản hồi: User nhấn \"Đặt ngay\" -\>
Hệ thống thêm vào giỏ hàng. User nhấn \"Thanh toán\" -\> Hệ thống chuyển
hướng sang VNPay Sandbox. User nhập thẻ test -\> VNPay trả về kết quả
-\> Hệ thống cập nhật trạng thái đơn hàng \"Đã thanh toán\".

3.2.3 Yêu cầu Chức năng: REQ-BOOK-01: Hệ thống cho phép chọn số lượng
người lớn/trẻ em. REQ-BOOK-02: Hệ thống phải tính tổng tiền tạm tính
chính xác. REQ-BOOK-03: Hệ thống phải tích hợp API VNPay để tạo URL
thanh toán an toàn (có checksum). REQ-BOOK-04: Hệ thống phải lưu đơn
hàng vào database với trạng thái ban đầu là \"Pending\". 3.3 Tính năng:
Trợ lý ảo AI 3.3.1 Mô tả và Mức độ ưu tiên Chatbot trả lời câu hỏi tự
nhiên dựa trên dữ liệu tour có sẵn. Mức độ ưu tiên: Medium (Trung
bình) - Tính năng nâng cao tạo điểm nhấn. 3.3.2 Chuỗi Kích thích/Phản
hồi User hỏi: \"Có tour nào đi Đà Lạt giá dưới 3 triệu không?\" Hệ thống
vector hóa câu hỏi -\> Tìm dữ liệu liên quan trong Pinecone -\> Gửi
prompt cho LLM. Chatbot trả lời: \"Dạ có, bên em có tour Đà Lạt 3N2Đ giá
2.5 triệu\...\" 3.3.3 Yêu cầu Chức năng REQ-AI-01: Chatbot phải hiểu
ngôn ngữ tự nhiên tiếng Việt. REQ-AI-02: Chatbot chỉ được trả lời dựa
trên dữ liệu (context) được cung cấp, không bịa đặt thông tin
(Hallucination). REQ-AI-03: Giao diện chat phải nổi (Floating Widget) ở
góc màn hình.

3.4 Tính năng: Quản trị Nội dung 3.4.1 Mô tả và Mức độ ưu tiên Khu vực
dành cho Admin quản lý dữ liệu. Mức độ ưu tiên: High (Cao). 3.4.3 Yêu
cầu Chức năng REQ-ADMIN-01: Admin phải đăng nhập được vào trang quản trị
Strapi. REQ-ADMIN-02: Admin có thể Tạo, Đọc, Sửa, Xóa (CRUD) Tour và Bài
viết. REQ-ADMIN-03: Admin có thể xem danh sách đơn hàng đặt tour.

3.5 Tính năng: Blog và Hướng dẫn Du lịch 3.5.1 Mô tả và Mức độ ưu tiên
Hệ thống hiển thị các bài viết chia sẻ kinh nghiệm, cẩm nang du lịch và
tin tức về công ty. Đây là nơi thể hiện kiến thức chuyên môn (Portfolio)
của đại lý du lịch. Mức độ ưu tiên: Medium (Trung bình) - Quan trọng cho
Marketing, nhưng không ảnh hưởng trực tiếp đến dòng tiền như tính năng
Booking. 3.5.2 Chuỗi Kích thích/Phản hồi Danh sách: User chọn menu \"Cẩm
nang\" -\> Hệ thống hiển thị danh sách bài viết (có phân trang, hình
thumbnail, tóm tắt). Chi tiết: User click vào một bài viết -\> Hệ thống
hiển thị toàn bộ nội dung bài viết, hình ảnh, video và các bài viết liên
quan 3.5.3 Yêu cầu Chức năng REQ-BLOG-01 (Danh mục): Hệ thống phải phân
loại bài viết theo danh mục (Ví dụ: Ẩm thực, Điểm đến, Mẹo vặt, Tin công
ty). REQ-BLOG-02 (Hiển thị danh sách): Trang danh sách phải hiển thị
theo thứ tự mới nhất, có tính năng phân trang. REQ-BLOG-03 (Chi tiết bài
viết): Trang chi tiết phải hỗ trợ hiển thị nội dung Rich Text (In đậm,
nghiêng, danh sách, tiêu đề H1/H2) được trả về từ Strapi. REQ-BLOG-04
(Media): Hệ thống phải hiển thị được ảnh chất lượng cao và nhúng video
(Youtube) trong bài viết. REQ-BLOG-05 (Gợi ý): Cuối bài viết phải có
phần \"Bài viết liên quan\" hoặc \"Tour gợi ý\" để điều hướng người
dùng.

3.6 Tính năng: Đăng nhập và Quản lý Người dùng 3.6.1 Mô tả và Mức độ ưu tiên Cho phép người dùng đăng ký tài khoản, đăng nhập, và quản lý thông tin cá nhân. Đây là tiền đề bắt buộc cho tính năng Đặt Tour (3.2) vì chỉ người dùng đã đăng nhập mới có thể đặt tour và xem lịch sử đơn hàng. Mức độ ưu tiên: High (Cao) - Là điều kiện tiên quyết cho Booking Engine. 3.6.2 Chuỗi Kích thích/Phản hồi Đăng ký: User nhấn \"Đăng ký\" -\> Nhập email, mật khẩu, họ tên, số điện thoại -\> Hệ thống tạo tài khoản -\> Chuyển hướng về trang chủ (đã đăng nhập). Đăng nhập: User nhấn \"Đăng nhập\" -\> Nhập email và mật khẩu -\> Hệ thống xác thực -\> Trả về JWT token -\> Cập nhật Navbar (hiển thị tên user thay vì nút Đăng nhập). Xem hồ sơ: User đã đăng nhập nhấn vào tên mình -\> Hệ thống hiển thị trang Profile với thông tin cá nhân và lịch sử đơn hàng. Đăng xuất: User nhấn \"Đăng xuất\" -\> Hệ thống xóa JWT token -\> Chuyển về trạng thái Guest. 3.6.3 Yêu cầu Chức năng REQ-AUTH-01: Hệ thống phải cho phép đăng ký tài khoản bằng email, mật khẩu, họ tên, và số điện thoại. REQ-AUTH-02: Hệ thống phải cho phép đăng nhập bằng email và mật khẩu, trả về JWT token. REQ-AUTH-03: Mật khẩu phải được mã hóa (hash) trước khi lưu vào database. REQ-AUTH-04: Hệ thống phải có trang Profile hiển thị thông tin cá nhân của người dùng đã đăng nhập. REQ-AUTH-05: Hệ thống phải có trang Lịch sử Đơn hàng cho người dùng đã đăng nhập. REQ-AUTH-06: Navbar phải thay đổi hiển thị dựa trên trạng thái đăng nhập (Guest: nút Đăng nhập/Đăng ký; Logged in: tên user + dropdown menu).
