const router = require('express').Router();

const homePageRoute = require('./homepage-route.js');
const postPageRoute = require('./postpage-route.js');
const loginRoute = require('./login-route.js');
const signupRoute = require('./signup-route.js');

router.use('/', homePageRoute);

router.use('/post', postPageRoute);

router.use('/login', loginRoute);

router.use('/signup', signupRoute);


router.get('*',  (req, res) => {
  res.render('404');
})



module.exports = router;