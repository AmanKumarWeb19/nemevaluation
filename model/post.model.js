const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  device: String,
  no_if_comments: Number,
});

const PostModel = mongoose.model("user", postSchema);

module.exports = {
  PostModel,
};
