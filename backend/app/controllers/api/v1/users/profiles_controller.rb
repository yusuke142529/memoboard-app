# app/controllers/api/v1/users/profiles_controller.rb

module Api
    module V1
      module Users
        class ProfilesController < ApplicationController
          before_action :authenticate_user!
  
          def show
            Rails.logger.debug("Fetching profile for user ID: #{current_user.id}")
            render json: { user: current_user }, status: :ok
          end
  
          def update
            Rails.logger.debug("Updating profile for user ID: #{current_user.id}")
            if current_user.update(profile_params)
              Rails.logger.debug("Profile updated successfully for user ID: #{current_user.id}")
              render json: { user: current_user }, status: :ok
            else
              Rails.logger.debug("Profile update failed for user ID: #{current_user.id} with errors: #{current_user.errors.full_messages}")
              render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
            end
          end
  
          private
  
          def profile_params
            params.require(:user).permit(:username, :email, :password, :password_confirmation)
          end
        end
      end
    end
  end