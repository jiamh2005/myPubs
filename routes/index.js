var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if (req.isAuthenticated()) {
    res.render('index', { title: 'PubServer 0.1' });
  }
  else
    res.redirect('/login');

});

module.exports = router;
