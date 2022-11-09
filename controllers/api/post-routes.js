const router = require('express').Router();
const {Post} = require('../../models');


// CREATE a new post
router.post('/', async (req, res) => {
  try {
    console.log(req.session.userId,req.body );
    const postData = await Post.create(
      {
        user_id: req.session.userId, 
        ...req.body 
      });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// UPDATE a post
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
