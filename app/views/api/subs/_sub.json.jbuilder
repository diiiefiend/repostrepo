json.(sub, :id, :title, :last_activity_stamp)

if !json.last_activity_stamp.nil?
  json.last_activity_stamp.to_formatted_s(:long_ordinal)
end
