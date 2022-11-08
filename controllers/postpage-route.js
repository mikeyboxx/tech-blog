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

    res.json(post);

    // res.render('homepage', {
    //   data: {
    //     title: 'The Tech Blog',
    //     posts: posts.map(el=>el.dataValues)
    //   }
    // });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
