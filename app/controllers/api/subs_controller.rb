module Api
  class SubsController < ApplicationController
    wrap_parameters false

    before_action :ensure_moderator, only: [:update, :destroy]

    def index
      @subs = Sub.all.order(last_activity_stamp: :desc).includes(:mod)
      render :index
    end

    def create
      @sub = current_user.modded_subs.new(sub_params)

      if @sub.save
        render json: @sub
      else
        render json: @sub.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @sub = current_sub
      if @sub.update(sub_params)
        render json: @sub
      else
        render json: @sub.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @sub = current_sub
      @posts = @sub.posts.page(params[:page])
      render :show
    end

    def destroy
      current_sub.delete
      render json: {}
    end

    private

    def sub_params
      params.require(:sub).permit(:title, :description)
    end

    def ensure_moderator
      render status: :unprocessable_entity unless current_sub.mod == current_user
    end

    def current_sub
      Sub.find(params[:id])
    end
  end
end
