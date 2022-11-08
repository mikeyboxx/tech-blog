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

    const arr = posts.map(el=>el.dataValues);
    // console.log(arr);

    res.render('homepage', {
      data: {
        title: 'The Tech Blog',
        posts: posts.map(el=>el.dataValues)
      }
    });

  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
