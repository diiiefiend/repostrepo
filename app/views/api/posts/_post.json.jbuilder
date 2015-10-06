json.extract! post, :id, :title, :url, :content, :last_activity_stamp

if !json.last_activity_stamp.nil?
  json.last_activity_stamp.to_formatted_s(:long_ordinal)
end

json.score post.score
json.created_at post.created_at.to_formatted_s(:long)

json.author do
  json.id post.author.id
  json.username post.author.username
end

json.comments post.comments do |comment|
  json.partial! 'api/comments/comment', comment: comment
end

json.subs post.subs do |subreddit|
  json.partial! 'api/subs/sub', sub: subreddit
end
