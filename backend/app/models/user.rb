# app/models/user.rb

class User < ApplicationRecord
       # Deviseモジュールの設定
       devise :database_authenticatable,
              :registerable,
              :recoverable,
              :validatable,
              :jwt_authenticatable
              # , :jwt_revocation_strategy => JwtDenylist  # 正しくコメントアウト
     
       # バリデーションの設定
       validates :username,
                 presence: true,
                 uniqueness: { case_sensitive: false },
                 length: { in: 2..20 },
                 format: { with: /\A[a-zA-Z0-9]+\z/, message: 'は半角英数字のみ使用できます' },
                 exclusion: { in: %w[admin superuser], message: '%{value} は使用できません' }
     
       validates :email,
                 presence: true,
                 uniqueness: true,
                 format: { with: URI::MailTo::EMAIL_REGEXP }
     
       validates :password,
                 length: { in: 8..32 },
                 format: { with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+\z/, message: 'は英大文字・英小文字・数字を含めてください' }
     end