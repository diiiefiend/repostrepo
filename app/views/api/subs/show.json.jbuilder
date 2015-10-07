json.partial! 'api/subs/sub', sub: @sub

json.posts @sub.posts do |post|
  json.partial! 'api/posts/post', post: post
end
