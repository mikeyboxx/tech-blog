const router = require('express').Router();

const homePageRoute = require('./home-page-route.js');
router.use('/', homePageRoute);

router.get('/post/:id', async (req, res) => {
  res.send(req.params.id);
});


router.get('*',  (req, res) => {
  res.render('404');
})



module.exports = router;