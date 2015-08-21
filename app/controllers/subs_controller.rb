class SubsController < ApplicationController
  before_action :ensure_moderator, only: [:edit, :update, :destroy]

  def new
    @sub = Sub.new

    render :new
  end

  def create
    @sub = current_user.modded_subs.new(sub_params)

    if @sub.save
      redirect_to subs_url
    else
      render :new
    end
  end

  def edit
    @sub = current_sub
    render :edit
  end

  def update
    @sub = current_sub
    if @sub.update(sub_params)
      redirect_to sub_url(@sub)
    else
      render :edit
    end
  end

  def index
    @subs = Sub.all

    render :index
  end

  def show
    @sub = current_sub

    render :show
  end

  def destroy
    current_sub.delete
    redirect_to subs_url
  end

  private

  def sub_params
    params.require(:sub).permit(:title, :description)
  end

  def ensure_moderator
    redirect_to subs_url unless current_sub.mod == current_user
  end

  def current_sub
    Sub.find(params[:id])
  end
end
