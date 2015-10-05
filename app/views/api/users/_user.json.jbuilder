json.(user, :id, :username, :email, :location, :prof_img)

json.created_at user.created_at.strftime("%m/%d/%Y")
