json.(comment, :id, :content, :post_id)
json.created_at comment.created_at.to_formatted_s(:long_ordinal)

json.score = comment.score

json.(comment.author, :id, :username)

json.child_comments comment.child_comments do |child_comment|
  json.partial! 'api/comments/comment', comment: child_comment
end
