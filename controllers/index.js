const router = require('express').Router();

const homePageRoute = require('./homepage-route.js');
const postPageRoute = require('./postpage-route.js');

router.use('/', homePageRoute);

router.use('/post/', postPageRoute);


router.get('*',  (req, res) => {
  res.render('404');
})



module.exports = router;