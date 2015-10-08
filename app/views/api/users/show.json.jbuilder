json.partial! 'api/users/user', user: @user

json.last_posts @user.posts.order(created_at: :desc).limit(5) do |post|
  json.partial! 'api/posts/post', post: post
end

json.last_comments @user.comments.order(created_at: :desc).limit(5) do |comment|
  json.partial! 'api/comments/comment', comment: comment
end
