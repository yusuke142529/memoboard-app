# app/controllers/api/v1/users/sessions_controller.rb

class Api::V1::Users::SessionsController < Devise::SessionsController
  respond_to :json

  # POST /api/v1/users/sign_in
  def create
    Rails.logger.debug("login_params: #{login_params.inspect}")
    user = User.find_by(email: login_params[:email])

    if user && user.valid_password?(login_params[:password])
      token = generate_jwt_token(user)
      if token
        render json: { message: 'ログインに成功しました。', token: token, user: user.slice(:id, :username, :email) }, status: :ok
      else
        render json: { errors: ['トークンの生成に失敗しました。管理者にお問い合わせください。'] }, status: :internal_server_error
      end
    else
      render json: { errors: ['メールアドレスまたはパスワードが正しくありません。'] }, status: :unauthorized
    end
  end

  # DELETE /api/v1/users/sign_out
  def destroy
    if current_user
      # トークンの無効化はWarden JWT Authが自動的に行います
      render json: { message: 'ログアウトしました。' }, status: :ok
    else
      render json: { error: 'ユーザーが見つかりません。' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.require(:user).permit(:email, :password)
  end

  def generate_jwt_token(user)
    begin
      token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
      Rails.logger.debug("Generated JWT Token: #{token}")
      token
    rescue StandardError => e
      Rails.logger.error "JWT生成エラー: #{e.message}"
      nil
    end
  end
end