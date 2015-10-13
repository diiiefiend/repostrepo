module Api
  class SessionsController < ApplicationController
    wrap_parameters false

    def show
      if current_user
        render :show
      else
        render json: {}
      end
    end

    def create
      @user = User.find_by_credentials(
        params[:user][:email],
        params[:user][:password]
      )
      if @user.nil?
        render json: {}, status: :unprocessable_entity
      else
        log_in!(@user)
        render :show
      end
    end

    def update
      form_params = session_params
      form_params.delete(:id);
      form_params.delete(:username);
      form_params.delete(:created_at);
      form_params.delete(:email);
      if form_params[:new_pword] && form_params[:old_pword]     #start password change logic here

      end

      if current_user.update(form_params)
        render :show
      else
        render json: current_user.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      log_out!
      render json: {}
    end

    private

    def session_params
      params.require(:user).permit(:id, :username, :email, :location, :prof_img, :created_at, :old_pword, :new_pword)
    end

  end
end
