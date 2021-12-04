const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

postSchema.pre('save', function(next) {
  this.url = `http://localhost:5000/files/${this.key}`

  next();
})

const Post = mongoose.model("Post", postSchema); 

module.exports = Post;