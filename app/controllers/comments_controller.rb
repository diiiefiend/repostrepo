class CommentsController < ApplicationController
  before_action :ensure_logged_in

  def new
    @comment = Comment.new
    render :new
  end

  def create
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      @comment.post.update(last_activity_stamp: @comment.created_at)
    else
      flash[:errors] = @comment.errors.full_messages
    end

    redirect_to post_url(@comment.post_id)
  end

  def show
    @comment = current_comment

    render :show
  end

  def upvote
    @comment = current_comment
    Vote.create!(value: 1, votable_type: "Comment", votable_id: @comment.id)
    redirect_to post_url(@comment.post)
  end

  def downvote
    @comment = current_comment
    Vote.create!(value: -1, votable_type: "Comment", votable_id: @comment.id)
    redirect_to post_url(@comment.post)
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :post_id, :parent_comment_id)
  end

  def current_comment
    Comment.find(params[:id])
  end
end
