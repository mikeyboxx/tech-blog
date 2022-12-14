const router = require('express').Router();
const {User, Post, Comment} = require('../models');


router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  

  try {
    const posts = await Post.findAll({
      where: {
        user_id: req.session.userId
      },
      include: [
        {model: User},
        {model: Comment,
          include: {model: User}},
      ],
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'content', 'createdAt']
    });

    // res.json(posts);

    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      loggedInUsername: req.session.username,    
      title: 'Your Dashboard',
      posts: posts.map(post => post.get(({ plain: true })))
    });

  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
