# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20221031215045) do

  create_table "comments", force: :cascade do |t|
    t.string   "content",           limit: 255,                 null: false
    t.integer  "user_id",           limit: 4,                   null: false
    t.integer  "post_id",           limit: 4,                   null: false
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.integer  "parent_comment_id", limit: 4
    t.boolean  "deleted",                       default: false
  end

  add_index "comments", ["parent_comment_id"], name: "index_comments_on_parent_comment_id", using: :btree
  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "post_subs", force: :cascade do |t|
    t.integer  "post_id",    limit: 4, null: false
    t.integer  "sub_id",     limit: 4, null: false
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "post_subs", ["post_id"], name: "index_post_subs_on_post_id", using: :btree
  add_index "post_subs", ["sub_id"], name: "index_post_subs_on_sub_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "title",               limit: 255,   null: false
    t.string   "url",                 limit: 255
    t.text     "content",             limit: 65535
    t.integer  "user_id",             limit: 4,     null: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.datetime "last_activity_stamp"
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "subs", force: :cascade do |t|
    t.string   "title",               limit: 255, null: false
    t.string   "description",         limit: 255, null: false
    t.integer  "user_id",             limit: 4,   null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.datetime "last_activity_stamp"
  end

  add_index "subs", ["user_id"], name: "index_subs_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           limit: 255, null: false
    t.string   "password_digest", limit: 255, null: false
    t.string   "session_token",   limit: 255, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "username",        limit: 255
    t.string   "location",        limit: 255
    t.string   "prof_img",        limit: 255
  end

  create_table "votes", force: :cascade do |t|
    t.integer  "value",        limit: 4,   default: 0, null: false
    t.integer  "votable_id",   limit: 4
    t.string   "votable_type", limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.integer  "user_id",      limit: 4,               null: false
  end

  add_index "votes", ["votable_type", "votable_id"], name: "index_votes_on_votable_type_and_votable_id", using: :btree

end
