// src/components/Logout.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                // トークンを取得してヘッダーに設定
                const token = localStorage.getItem('token');
                if (token) {
                    await axios.delete('/api/v1/users/sign_out', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }

                // トークンを削除してリダイレクト
                localStorage.removeItem('token');
                navigate('/login');
            } catch (error: any) {
                console.error('ログアウトエラー:', error);
                alert('ログアウトに失敗しました。');
            }
        };

        logout();
    }, [navigate]);

    return null;
};

export default Logout;