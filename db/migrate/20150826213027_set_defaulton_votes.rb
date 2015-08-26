class SetDefaultonVotes < ActiveRecord::Migration
  def change
    change_column_default(:votes, :value, 0)
  end
end
