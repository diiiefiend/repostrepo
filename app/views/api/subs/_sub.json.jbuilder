json.(sub, :id, :title, :last_activity_stamp)

json.mod do
  json.id sub.mod.id
  json.username sub.mod.username
end

if !json.last_activity_stamp.nil?
  json.last_activity_stamp.to_formatted_s(:long_ordinal)
end
