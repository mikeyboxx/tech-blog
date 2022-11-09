const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// CREATE new user
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    
    req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = dbUserData.id;
        res.status(200).json(dbUserData);
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

        
        // Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username.toLowerCase(),
      },
    });

    if (!dbUserData) {
      res
        .status(399)
        .json({ message: 'Username does not exist. Please try again!' });
      return;
    }

    const validPassword = await bcrypt.compareSync(req.body.password, dbUserData.password);

    if (!validPassword) {
      res
        .status(399)
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
