json.(comment, :id, :content, :post_id, :parent_comment_id)
json.created_at comment.created_at.to_formatted_s(:long_ordinal)

json.score comment.score

json.author do
  json.id comment.author.id
  json.username comment.author.username
end

json.child_comments comment.child_comments do |child_comment|
  json.partial! 'api/comments/comment', comment: child_comment
end
