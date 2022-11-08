const router = require('express').Router();

// Login route
router.get('/', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the 'login' template
  res.render('login', {
    signUp: true,
    title: 'The Tech Blog',
  });
});

module.exports = router;
