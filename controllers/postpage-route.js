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
    console.log(post);
    res.render('postpage', {
      data: {
        title: 'The Tech Blog',
        post: post.dataValues
      }
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
