// src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ProfileEdit from './components/ProfileEdit';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './components/Logout';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default App;