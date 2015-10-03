class AddlastactivitystamptoSubs < ActiveRecord::Migration
  def change
    add_column :subs, :last_activity_stamp, :datetime, index: true
  end
end
