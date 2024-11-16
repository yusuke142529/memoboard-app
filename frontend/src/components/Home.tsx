// src/components/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // CSSファイルをインポート

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">ようこそ、メモアプリへ！</h1>
        <p className="home-description">シンプルで使いやすいメモ管理ツールをお楽しみください。</p>
        <div className="home-buttons">
          <Link to="/signup" className="btn btn-primary">
            サインアップ
          </Link>
          <Link to="/login" className="btn btn-secondary">
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;