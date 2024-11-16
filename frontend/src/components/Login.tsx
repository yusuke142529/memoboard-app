// src/components/Login.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../services/api';
import '../styles/Login.css';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('有効なメールアドレスを入力してください')
        .required('必須項目です'),
      password: Yup.string()
        .min(8, '8文字以上で入力してください')
        .required('必須項目です'),
      rememberMe: Yup.bool(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          user: {
            email: values.email,
            password: values.password,
          },
        };
        console.log("送信データ:", payload); // デバッグ用
        const response = await axios.post('/api/v1/users/sign_in', payload);
        alert('ログインに成功しました。');
        // トークンの保存やリダイレクト処理を追加
        localStorage.setItem('token', response.data.token);
        resetForm();
      } catch (error: any) {
        console.error('ログインエラー:', error.response ? error.response.data : error);
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors.join('\n');
          alert(`ログインに失敗しました:\n${errorMessages}`);
        } else {
          alert('ログインに失敗しました。');
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <h2 className="form-title">ログイン</h2>

      <div className="mb-4">
        <label htmlFor="email" className="form-label">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="form-field"
          placeholder="例: johndoe@example.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error-message">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="form-label">
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="form-field"
          placeholder="パスワードを入力"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error-message">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.rememberMe}
            className="form-checkbox"
          />
          <span className="ml-2">ログイン状態を保持する</span>
        </label>
      </div>

      <button type="submit" className="submit-button">
        ログイン
      </button>
    </form>
  );
};

export default Login;