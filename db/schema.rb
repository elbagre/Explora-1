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

ActiveRecord::Schema.define(version: 20161215002607) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "actionables", force: :cascade do |t|
    t.integer "user_id",          null: false
    t.integer "actionable_id",    null: false
    t.string  "actionable_class", null: false
    t.string  "actionable_type",  null: false
  end

  add_index "actionables", ["user_id", "actionable_id"], name: "index_actionables_on_user_id_and_actionable_id", using: :btree

  create_table "answers", force: :cascade do |t|
    t.integer  "author_id",                      null: false
    t.integer  "question_id",                    null: false
    t.text     "body",                           null: false
    t.integer  "upvotes",            default: 0
    t.integer  "downvotes",          default: 0
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "answers", ["author_id"], name: "index_answers_on_author_id", using: :btree
  add_index "answers", ["question_id"], name: "index_answers_on_question_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "author_id",              null: false
    t.integer  "answer_id",              null: false
    t.text     "body",                   null: false
    t.integer  "upvotes",    default: 0
    t.integer  "downvotes",  default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "comments", ["answer_id"], name: "index_comments_on_answer_id", using: :btree
  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "user_id",            null: false
    t.integer  "followed_item_id",   null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "followed_item_type", null: false
  end

  add_index "follows", ["followed_item_type", "followed_item_id"], name: "index_follows_on_followed_item_type_and_followed_item_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.string   "title",                       null: false
    t.text     "description"
    t.integer  "author_id",                   null: false
    t.boolean  "answered",    default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "questions", ["author_id"], name: "index_questions_on_author_id", using: :btree

  create_table "tag_topics", force: :cascade do |t|
    t.integer  "topic_id",    null: false
    t.integer  "question_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "tag_topics", ["topic_id", "question_id"], name: "index_tag_topics_on_topic_id_and_question_id", unique: true, using: :btree

  create_table "topics", force: :cascade do |t|
    t.string   "name",        null: false
    t.integer  "parent_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "description"
  end

  add_index "topics", ["name"], name: "index_topics_on_name", unique: true, using: :btree

  create_table "user_actions", force: :cascade do |t|
    t.integer  "user_id",         null: false
    t.integer  "actionable_id",   null: false
    t.string   "actionable_type", null: false
    t.string   "user_action",     null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "user_actions", ["user_id", "actionable_id"], name: "index_user_actions_on_user_id_and_actionable_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",           null: false
    t.string   "email",              null: false
    t.string   "password_digest",    null: false
    t.string   "session_token",      null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
