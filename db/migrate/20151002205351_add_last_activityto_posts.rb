class AddLastActivitytoPosts < ActiveRecord::Migration
  def change
    add_column :posts, :last_activity_stamp, :datetime, index: true
  end
end
