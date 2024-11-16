# config/initializers/devise.rb
# frozen_string_literal: true

# JwtDenylistモデルを先にロード
# この行を追加することで、モデルがロードされていることを保証します。
# ただし、モデルがまだ存在しないため、ここではコメントアウトします。
# require_dependency 'jwt_denylist'

Devise.setup do |config|
  # 必要な場合のみ設定
  config.secret_key = Rails.application.secret_key_base if Rails.env.production?

  # メール送信者のアドレスを設定
  config.mailer_sender = 'no-reply@your_actual_domain.com'

  # 使用するORMを設定
  require 'devise/orm/active_record'

  # 認証に使用するキーの設定
  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]

  # セッションストレージをスキップ
  config.skip_session_storage = [:http_auth, :params_auth]

  # ナビゲーショナルフォーマットを無効化
  config.navigational_formats = []

  # bcryptのストレッチ数を設定
  config.stretches = Rails.env.test? ? 1 : 12

  # パスワードの長さを設定
  config.password_length = 6..128

  # メールアドレスのフォーマットを設定
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/

  # パスワードリセットの有効期限を設定
  config.reset_password_within = 6.hours

  # サインアウト時のHTTPメソッドを設定
  config.sign_out_via = :delete

  # Wardenの設定
  config.warden do |manager|
    manager.default_strategies(scope: :user).unshift :jwt
  end

  # JWTの設定
  config.jwt do |jwt|
    jwt.secret = Rails.application.credentials.devise[:jwt_secret_key]
    jwt.dispatch_requests = [
      ['POST', %r{^/api/v1/users/sign_in$}],
      ['POST', %r{^/api/v1/users$}]
    ]
    jwt.revocation_requests = [
      ['DELETE', %r{^/api/v1/users/sign_out$}]
    ]
    # 一時的にコメントアウト
    # jwt.revocation_strategy = JwtDenylist
    jwt.expiration_time = 1.day.to_i
  end
end