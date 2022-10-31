class AddBackIndexes < ActiveRecord::Migration
  def change
    add_index "comments", ["parent_comment_id"], name: "index_comments_on_parent_comment_id", using: :btree
    add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree
    add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

    add_index "post_subs", ["post_id"], name: "index_post_subs_on_post_id", using: :btree
    add_index "post_subs", ["sub_id"], name: "index_post_subs_on_sub_id", using: :btree

    add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

    add_index "subs", ["user_id"], name: "index_subs_on_user_id", using: :btree

    add_index "votes", ["votable_type", "votable_id"], name: "index_votes_on_votable_type_and_votable_id", using: :btree
  end
end
