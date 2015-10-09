module Api
  class UsersController < ApplicationController
    wrap_parameters false

    def create
      @user = User.new(user_params)

      if @user.save
        log_in!(@user)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @user = User.includes(:comments, :posts, :votes).find(params[:id]);
      render :show
    end

    private

    def user_params
      params.require(:user).permit(:username, :location, :prof_img, :email, :password)
    end
  end
end
