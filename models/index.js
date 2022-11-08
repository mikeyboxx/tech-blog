const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User has a one to many relationship with Post
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// User has a one to many relationship with Comment
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// Post has a one to many relationship with Comment
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };