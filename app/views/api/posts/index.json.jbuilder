json._page @posts.current_page
json._total_pages @posts.total_pages

json.posts @posts do |post|
  json.partial! 'api/posts/post', post: post
end
