require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    config.autoload_lib(ignore: %w(assets tasks))

    # Only loads a smaller set of middleware suitable for API only apps.
    config.api_only = true

    # CORS設定
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3002' # フロントエンドのURLを正確に記載
        resource '*',
                 headers: :any,
                 methods: %i[get post put patch delete options head],
                 expose: %w[Authorization], # 必要ならばAuthorizationヘッダーを明示的に許可
                 credentials: true
      end
    end
  end
end