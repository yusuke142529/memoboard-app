// src/components/SignUp.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../services/api';
import '../styles/SignUp.css';

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  agreement: boolean;
}

const SignUp: React.FC = () => {
  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      agreement: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, '半角英数字のみ使用できます')
        .min(2, '2文字以上で入力してください')
        .max(20, '20文字以内で入力してください')
        .required('必須項目です'),
      email: Yup.string()
        .email('有効なメールアドレスを入力してください')
        .required('必須項目です'),
      password: Yup.string()
        .min(8, '8文字以上で入力してください')
        .max(32, '32文字以内で入力してください')
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          '英大文字・英小文字・数字を含めてください'
        )
        .required('必須項目です'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'パスワードが一致しません')
        .required('必須項目です'),
      agreement: Yup.bool()
        .oneOf([true], '利用規約に同意してください')
        .required('必須項目です'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('/api/v1/users', {
          user: {
            username: values.username,
            email: values.email,
            password: values.password,
            password_confirmation: values.passwordConfirmation,
          },
        });
        alert('登録が完了しました。');
        resetForm();
        // 必要に応じてリダイレクト処理を追加
      } catch (error: any) {
        // エラーメッセージの詳細を取得して表示
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors.join('\n');
          alert(`登録に失敗しました:\n${errorMessages}`);
        } else {
          alert('登録に失敗しました。');
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <h2 className="form-title">ユーザー登録</h2>

      <div className="mb-4">
        <label htmlFor="username" className="form-label">
          ユーザー名
        </label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="form-field"
          placeholder="例: johnDoe123"
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="error-message">{formik.errors.username}</div>
        ) : null}
      </div>

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
        <label htmlFor="passwordConfirmation" className="form-label">
          パスワード確認
        </label>
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirmation}
          className="form-field"
          placeholder="もう一度パスワードを入力"
        />
        {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation ? (
          <div className="error-message">
            {formik.errors.passwordConfirmation}
          </div>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            id="agreement"
            name="agreement"
            type="checkbox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.agreement}
            className="form-checkbox"
          />
          <span className="ml-2">利用規約に同意します</span>
        </label>
        {formik.touched.agreement && formik.errors.agreement ? (
          <div className="error-message">{formik.errors.agreement}</div>
        ) : null}
      </div>

      <button type="submit" className="submit-button">
        登録
      </button>
    </form>
  );
};

export default SignUp;