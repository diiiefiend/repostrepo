class AddUsernameProfPicLocationToUsers < ActiveRecord::Migration
  def change
    add_column :users, :username, :string, index: true
    add_column :users, :location, :string
    add_column :users, :prof_img, :string
  end
end
