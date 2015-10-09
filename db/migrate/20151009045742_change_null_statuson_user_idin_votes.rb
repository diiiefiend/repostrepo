class ChangeNullStatusonUserIdinVotes < ActiveRecord::Migration
  def change
    change_column_null :votes, :user_id, false
  end
end
