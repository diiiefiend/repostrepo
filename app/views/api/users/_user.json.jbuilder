json.(user, :id, :username, :email, :location)

json.prof_img image_path(user.prof_img)

json.created_at user.created_at.strftime("%m/%d/%Y")

if user == current_user
  json.votes user.votes do |vote|
    json.votableKey vote.votable_type + vote.votable_id.to_s
    json.value vote.value
  end
end
