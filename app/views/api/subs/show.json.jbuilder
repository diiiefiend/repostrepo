json.partial! 'api/subs/sub', sub: @sub

json.description @sub.description

json.posts @sub.posts do |post|
  json.partial! 'api/posts/post', post: post
end
