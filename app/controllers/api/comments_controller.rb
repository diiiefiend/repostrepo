module Api
  class CommentsController < ApplicationController
    wrap_parameters false

    def create
      @comment = current_user.comments.new(comment_params)
      if @comment.save
        render :show
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @comment = current_comment
      render :show
    end

    def update
      @comment = current_comment
      if @comment.update(comment_params)
        render :show
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @comment = current_comment
      @comment.content = "[deleted]"
      @comment.deleted = true
      if @comment.save
        render :show
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def upvote
      @comment = current_comment
      delete_vote
      Vote.create!(value: 1, votable_type: "Comment", votable_id: @comment.id, user_id: current_user.id)
      render :show
    end

    def downvote
      @comment = current_comment
      delete_vote
      Vote.create!(value: -1, votable_type: "Comment", votable_id: @comment.id, user_id: current_user.id)
      render :show
    end

    def clear_vote
      delete_vote
      render :show
    end

    private

    def comment_params
      params.require(:comment).permit(:content, :post_id, :parent_comment_id)
    end

    def current_comment
      Comment.find(params[:id])
    end

    def delete_vote
      @comment = current_comment
      prior_vote = current_user.votes.where(votable_type: 'Comment', votable_id: @comment.id);
      Vote.destroy(prior_vote) if !prior_vote.empty?
    end
  end
end
