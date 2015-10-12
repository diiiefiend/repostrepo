json.partial! 'api/subs/sub', sub: @sub

json.description @sub.description

json.posts @sub.posts.order(last_activity_stamp: :desc) do |post|
  json.partial! 'api/posts/post', post: post
end
