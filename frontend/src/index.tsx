// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Router をインポート
import App from './App'; // './App' が正しいパス
import './styles/globals.css'; // Tailwind CSS

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <Router> {/* Router で App をラップ */}
        <App />
      </Router>
    </React.StrictMode>
  );
} else {
  console.error("Root container not found");
}