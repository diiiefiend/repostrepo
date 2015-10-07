json.array! @subs do |sub|
  json.partial! 'api/subs/sub', sub: sub
  json.description sub.description
end
