import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
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
  },
};

const pageVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Profile = () => {
  const { user, logout } = useAuth();
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const TEXT = displayData[currentLanguage.code] || displayData.en;

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
      </div>
    </motion.div>
  );
};

export default Profile;
