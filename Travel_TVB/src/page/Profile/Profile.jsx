import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import config from '../../config/strapi';
import './Profile.css';

const displayData = {
  vi: {
    title: 'Ho So Ca Nhan',
    fullNameLabel: 'Ho va ten',
    emailLabel: 'Email',
    usernameLabel: 'Ten dang nhap',
    phoneLabel: 'So dien thoai',
    logoutButton: 'Dang Xuat',
    notProvided: 'Chua cung cap',
    memberSince: 'Thanh vien tu',
    ordersTitle: 'Lich Su Dat Tour',
    noOrders: 'Chua co don dat tour nao.',
    tourCol: 'Tour',
    dateCol: 'Ngay di',
    guestsCol: 'So nguoi',
    totalCol: 'Tong tien',
    statusCol: 'Trang thai',
    statusPending: 'Cho thanh toan',
    statusPaid: 'Da thanh toan',
    statusFailed: 'That bai',
    statusCancelled: 'Da huy',
    viewTicket: 'Xem Ve',
    loadingOrders: 'Dang tai...',
  },
  en: {
    title: 'My Profile',
    fullNameLabel: 'Full Name',
    emailLabel: 'Email',
    usernameLabel: 'Username',
    phoneLabel: 'Phone Number',
    logoutButton: 'Logout',
    notProvided: 'Not provided',
    memberSince: 'Member since',
    ordersTitle: 'Booking History',
    noOrders: 'No bookings yet.',
    tourCol: 'Tour',
    dateCol: 'Travel Date',
    guestsCol: 'Guests',
    totalCol: 'Total',
    statusCol: 'Status',
    statusPending: 'Pending',
    statusPaid: 'Paid',
    statusFailed: 'Failed',
    statusCancelled: 'Cancelled',
    viewTicket: 'View Ticket',
    loadingOrders: 'Loading...',
  },
  zh: {
    title: '个人资料',
    fullNameLabel: '全名',
    emailLabel: '电子邮件',
    usernameLabel: '用户名',
    phoneLabel: '电话号码',
    logoutButton: '退出登录',
    notProvided: '未提供',
    memberSince: '注册日期',
    ordersTitle: '预订历史',
    noOrders: '暂无预订。',
    tourCol: '旅游',
    dateCol: '出发日期',
    guestsCol: '人数',
    totalCol: '总计',
    statusCol: '状态',
    statusPending: '待支付',
    statusPaid: '已支付',
    statusFailed: '失败',
    statusCancelled: '已取消',
    viewTicket: '查看票据',
    loadingOrders: '加载中...',
  },
};

const formatPrice = (price) => {
  if (!price) return '0 ₫';
  return new Intl.NumberFormat('vi-VN').format(parseInt(price)) + ' ₫';
};

const statusMap = {
  Pending: { class: 'status-pending', key: 'statusPending' },
  Paid: { class: 'status-paid', key: 'statusPaid' },
  Failed: { class: 'status-failed', key: 'statusFailed' },
  Cancelled: { class: 'status-cancelled', key: 'statusCancelled' },
};

const pageVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Profile = () => {
  const { user, token, logout } = useAuth();
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const TEXT = displayData[currentLanguage.code] || displayData.en;

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${config.STRAPI_URL}${config.API_ENDPOINTS.BOOKING_MY_BOOKINGS}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const json = await res.json();
          setBookings(json.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoadingBookings(false);
      }
    };
    fetchBookings();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const memberDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(
        currentLanguage.code === 'vi' ? 'vi-VN' : currentLanguage.code === 'zh' ? 'zh-CN' : 'en-US'
      )
    : '';

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible">
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              {(user.full_name || user.username || 'U').charAt(0).toUpperCase()}
            </div>
            <h1>{TEXT.title}</h1>
            {memberDate && (
              <p className="profile-member-since">{TEXT.memberSince} {memberDate}</p>
            )}
          </div>

          <div className="profile-info">
            <div className="profile-info-item">
              <span className="profile-label">{TEXT.fullNameLabel}</span>
              <span className="profile-value">{user.full_name || TEXT.notProvided}</span>
            </div>
            <div className="profile-info-item">
              <span className="profile-label">{TEXT.emailLabel}</span>
              <span className="profile-value">{user.email}</span>
            </div>
            <div className="profile-info-item">
              <span className="profile-label">{TEXT.usernameLabel}</span>
              <span className="profile-value">{user.username}</span>
            </div>
            <div className="profile-info-item">
              <span className="profile-label">{TEXT.phoneLabel}</span>
              <span className="profile-value">{user.phone || TEXT.notProvided}</span>
            </div>
          </div>

          <button className="profile-logout-btn" onClick={handleLogout}>
            {TEXT.logoutButton}
          </button>
        </div>

        {/* Order History */}
        <div className="profile-orders-container">
          <h2 className="profile-orders-title">{TEXT.ordersTitle}</h2>
          {loadingBookings && <p className="profile-orders-message">{TEXT.loadingOrders}</p>}
          {!loadingBookings && bookings.length === 0 && (
            <p className="profile-orders-message">{TEXT.noOrders}</p>
          )}
          {!loadingBookings && bookings.length > 0 && (
            <div className="profile-orders-list">
              {bookings.map((b) => {
                const statusInfo = statusMap[b.status] || statusMap.Pending;
                return (
                  <div key={b.id} className="profile-order-card">
                    <div className="profile-order-tour">
                      {b.tour_slug ? (
                        <Link to={`/tours/${b.tour_slug}`}>{b.tour_name}</Link>
                      ) : (
                        <span>{b.tour_name}</span>
                      )}
                    </div>
                    <div className="profile-order-details">
                      <div className="profile-order-detail">
                        <span className="profile-order-label">{TEXT.dateCol}</span>
                        <span>{b.travel_date}</span>
                      </div>
                      <div className="profile-order-detail">
                        <span className="profile-order-label">{TEXT.guestsCol}</span>
                        <span>{b.adult_count} + {b.child_count}</span>
                      </div>
                      <div className="profile-order-detail">
                        <span className="profile-order-label">{TEXT.totalCol}</span>
                        <span className="profile-order-price">{formatPrice(b.total_price)}</span>
                      </div>
                      <div className="profile-order-detail">
                        <span className="profile-order-label">{TEXT.statusCol}</span>
                        <span className={`profile-order-status ${statusInfo.class}`}>
                          {TEXT[statusInfo.key]}
                        </span>
                      </div>
                      {b.status === 'Paid' && (
                        <div className="profile-order-detail profile-order-ticket">
                          <Link to={`/booking/${b.id}/ticket`} className="profile-ticket-btn">
                            {TEXT.viewTicket}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
