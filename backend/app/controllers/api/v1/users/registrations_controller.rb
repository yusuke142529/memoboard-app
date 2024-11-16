# app/controllers/api/v1/users/registrations_controller.rb

class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    if resource.save
      if resource.active_for_authentication?
        token = Warden::JWTAuth::UserEncoder.new.call(resource, :user, nil).first
        render json: { message: '登録が完了しました。', token: token, user: resource }, status: :created
      else
        expire_data_after_sign_in!
        render json: { message: "確認が必要です。" }, status: :created
      end
    else
      # エラーの詳細をフロントエンドに返す
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end