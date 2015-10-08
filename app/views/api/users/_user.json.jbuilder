json.(user, :id, :username, :email, :location)

json.prof_img image_path(user.prof_img)

json.created_at user.created_at.strftime("%m/%d/%Y")
