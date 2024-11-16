// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // トークンがない場合はログインページにリダイレクト
        return <Navigate to="/login" replace />;
    }

    // トークンがある場合は子要素を表示
    return <>{children}</>;
};

export default ProtectedRoute;