const router = require('express').Router();
const {User, Post} = require('../models');


router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ 
        model: User,
        attributes: ['username']
      }],
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'content', 'createdAt']
    });

    // res.json(posts);

    res.render('homepage', {
      title: 'The Tech Blog',
      posts: posts.map(post => post.get(({ plain: true })))
    });

  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
