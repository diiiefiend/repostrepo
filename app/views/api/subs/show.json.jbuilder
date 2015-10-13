json.partial! 'api/subs/sub', sub: @sub

json.description @sub.description

json._page @posts.current_page
json._total_pages @posts.total_pages

json.posts @posts.order(last_activity_stamp: :desc) do |post|
  json.partial! 'api/posts/post', post: post
end
