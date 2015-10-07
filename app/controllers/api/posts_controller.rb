module Api
  class PostsController < ApplicationController
    wrap_parameters false

    before_action :ensure_sub, only: :create

    def index
      @posts = Post.all.order(last_activity_stamp: :desc).includes(:author, :votes, :subs)         #this is the front page
      render :index
    end

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
        @post.sub_ids = sub_ids
        redirect_to post_url(@post)
      else
        flash.now[:errors] = @post.errors.full_messages
        render :new
      end
    end

    def show
      @post = current_post
      @all_comments = @post.comments.includes(:author)
      @comment_hash = @post.comments_by_parent_id
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
      sub_ids = post_params[:sub_id].map(&:to_i)
      pars_for_post = post_params
      pars_for_post.delete_if { |k, v| k == "sub_id" }

      if @post.update(pars_for_post)
        @post.sub_ids = sub_ids
        redirect_to post_url(@post)
      else
        flash.now[:errors] = @post.errors.full_messages
        render :edit
      end
    end

    def upvote
      @post = current_post
      Vote.create!(value: 1, votable_type: "Post", votable_id: @post.id)
      redirect_to sub_url(@post.sub_ids.first)
    end

    def downvote
      @post = current_post
      Vote.create!(value: -1, votable_type: "Post", votable_id: @post.id)
      redirect_to sub_url(@post.sub_ids.first)
    end

    private

    def post_params
      params.require(:post).permit(:title, :url, :content, :user_id, :sub_id => [])
    end

    def current_post
      Post.find(params[:id])
    end

    def ensure_sub
      render :new if post_params[:sub_id].empty?
    end
  end
end
