module Api
  class PostsController < ApplicationController
    wrap_parameters false

    before_action :ensure_sub, only: :create

    def index
      @posts = Post.all.order(last_activity_stamp: :desc).includes(:author, :votes, :subs).page(params[:page])         #this is the front page
      render :index
    end

    def show
      @post = current_post
      @all_comments = @post.comments.includes(:author).order(created_at: :desc)
      @comment_hash = @post.comments_by_parent_id
      render :show
    end

    def create
      sub_ids = post_params[:sub_id].map(&:to_i)
      pars_for_post = post_params
      pars_for_post.delete_if { |k, v| k == "sub_id" }
      @post = current_user.posts.new(pars_for_post)
      if @post.save
        @post.sub_ids = sub_ids
        @all_comments = @post.comments
        @comment_hash = @post.comments_by_parent_id
        render :show
      else
        render json: @post.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @post = current_post
      sub_ids = post_params[:sub_id].map(&:to_i)
      pars_for_post = post_params
      pars_for_post.delete_if { |k, v| k == "sub_id" }

      if @post.update(pars_for_post)
        @post.sub_ids = sub_ids
        @all_comments = @post.comments.includes(:author).order(created_at: :desc)
        @comment_hash = @post.comments_by_parent_id
        render :show
      else
        render json: @post.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      current_post.delete
      render json: {}
    end

    def upvote
      @post = current_post
      delete_vote
      Vote.create!(value: 1, votable_type: "Post", votable_id: @post.id, user_id: current_user.id)
      render :blurb
    end

    def downvote
      @post = current_post
      delete_vote
      Vote.create!(value: -1, votable_type: "Post", votable_id: @post.id, user_id: current_user.id)
      render :blurb
    end

    def clear_vote
      delete_vote
      render :blurb
    end


    private

    def post_params
      params.require(:post).permit(:title, :url, :content, :user_id, :sub_id => [])
    end

    def current_post
      Post.includes(:subs).find(params[:id])
    end

    def delete_vote
      @post = current_post
      prior_vote = current_user.votes.where(votable_type: 'Post', votable_id: @post.id);

      Vote.destroy(prior_vote) if !prior_vote.empty?
    end

    def ensure_sub
      render status: :unprocessable_entity if post_params[:sub_id].empty?
    end
  end
end
