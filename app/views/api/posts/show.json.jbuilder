json.partial! 'api/posts/post', post: @post

json.comments @all_comments.each do |comment|
  json.partial! 'api/comments/comment', comment: comment
end

json.comment_hash @comment_hash
