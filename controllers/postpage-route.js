const router = require('express').Router();
const {User, Post, Comment} = require('../models');


router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { 
          model: User,
          attributes: ['username']
        },
        { 
          model: Comment,
          attributes: ['content', 'createdAt'],
          include : [
            { 
              model: User,
              attributes: ['username'],
              order: [['createdAt', 'DESC']],
            },
          ]
        },
      ],
    });

    // res.json(post);

    res.render('postpage', {
      title: 'The Tech Blog',
      post: post.get({plain: true})
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
