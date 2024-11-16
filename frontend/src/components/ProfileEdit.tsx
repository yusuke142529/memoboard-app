import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from '../services/api';

interface User {
  username: string;
  email: string;
  password?: string; // オプションとしてパスワードを追加
}

const ProfileEdit: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: '',
    email: '',
  });

  const [newPassword, setNewPassword] = useState(''); // パスワード専用の状態を追加

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<User>('/api/v1/users/profile');
        setUser(response.data);
      } catch (error: any) {
        console.error('ユーザー情報の取得エラー:', error);
        const errorMessage = error.response?.data?.errors?.join(', ') || 'ユーザー情報の取得に失敗しました。';
        alert(errorMessage);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setNewPassword(value); // パスワード専用の状態を更新
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const updatedUserData = {
        ...user,
        ...(newPassword && { password: newPassword }), // 新しいパスワードがある場合のみ追加
      };
      await axios.put('/api/v1/users/profile', { user: updatedUserData });
      alert('プロフィールを更新しました。');
    } catch (error: any) {
      console.error('プロフィールの更新エラー:', error);
      const errorMessage = error.response?.data?.errors?.join(', ') || 'プロフィールの更新に失敗しました。';
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ユーザー名:
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        メールアドレス:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </label>
      <br />
      {/* パスワード変更フィールド */}
      <label>
        新しいパスワード:
        <input
          type="password"
          name="password"
          value={newPassword}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">更新</button>
    </form>
  );
};

export default ProfileEdit;