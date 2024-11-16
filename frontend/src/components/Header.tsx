// src/components/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const token = localStorage.getItem('token');

  return (
    <header>
      <nav>
        <Link to="/">ホーム</Link>
        {token ? (
          <>
            <Link to="/profile">プロフィール編集</Link>
            <Link to="/logout">ログアウト</Link>
          </>
        ) : (
          <>
            <Link to="/login">ログイン</Link>
            <Link to="/signup">サインアップ</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;