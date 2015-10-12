json.(comment, :id, :content, :post_id, :parent_comment_id, :deleted)
json.created_at comment.created_at.to_formatted_s(:long_ordinal)

json.score comment.score

json.author do
  json.id comment.author.id
  json.username comment.author.username
end

json.post do
  json.partial! 'api/posts/postBlurb', post: comment.post
end
