// src/services/api.ts

import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
});

// リクエストインターセプターの設定
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token.replace(/^Bearer\s/, '')}`;
    }
    return config;
  },
  (error) => {
    console.error('リクエストエラー:', error);
    return Promise.reject(error);
  }
);

export default instance;