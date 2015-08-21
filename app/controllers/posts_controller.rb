class PostsController < ApplicationController
  def new
    @post = Post.new
    render :new
  end

  def create
    sub_ids = post_params[:sub_id].map(&:to_i)
    pars_for_post = post_params
    pars_for_post.delete_if { |k, v| k == "sub_id" }
    @post = current_user.posts.new(pars_for_post)
    if @post.save
      @post.sub_ids = post_params[:sub_id].map(&:to_i)
      redirect_to post_url(@post)
    else
      render :new
    end
  end

  def show
    @post = current_post
    render :show
  end

  def destroy
    to_destroy = current_post.delete
    redirect_to subs_url
  end

  def edit
    @post = current_post

    render :edit
  end

  def update
    @post = current_post

    if @post.update(post_params)
      redirect_to post_url(@post)
    else
      render :edit
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :url, :content, :user_id, :sub_id => [])
  end

  def current_post
    Post.find(params[:id])
  end
end
