# config/routes.rb

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Deviseのルーティング設定をカスタマイズ
      devise_for :users,
                 controllers: {
                   registrations: 'api/v1/users/registrations',
                   sessions: 'api/v1/users/sessions',
                   passwords: 'api/v1/users/passwords'
                 },
                 path: '',
                 path_names: {
                   sign_in: 'sign_in',
                   sign_out: 'sign_out',
                   registration: 'sign_up'
                 },
                 defaults: { format: :json }

      # プロファイル用のルートを追加
      namespace :users do
        resource :profile, only: [:show, :update], controller: 'profiles'
      end
    end
  end
end