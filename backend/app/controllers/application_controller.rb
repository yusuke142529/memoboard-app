class ApplicationController < ActionController::API
  include Devise::Controllers::Helpers

  # 共通のレスキュー処理や認証フィルタを追加する場合はここに記述

  # 例: 認証エラーのハンドリング
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def not_found
    render json: { error: 'Resource not found' }, status: :not_found
  end
end