json.extract! post, :id, :title

json.subs post.subs.order(last_activity_stamp: :desc) do |subreddit|
  json.partial! 'api/subs/sub', sub: subreddit
end
