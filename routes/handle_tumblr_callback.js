var express = require('express');
var router = express.Router();
var tumblr = require('tumblr.js');
var userData;
var client;

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.session.grant.step1.oauth_token = req.query.access_token;
  req.session.grant.step1.oauth_token_secret = req.query.access_secret;
  
  client = tumblr.createClient({
    consumer_key: req.app.locals.config.tumblr_app.tumblr_consumer_key,
    consumer_secret: req.app.locals.config.tumblr_app.tumblr_consumer_secret,
    token: req.session.grant.step1.oauth_token,
    token_secret: req.session.grant.step1.oauth_token_secret
  });

  client.userInfo(function(err, data){
    userData = data.user;
    client.blogLikes(userData.blogs[0].name+'.tumblr.com', {offset: 0, limit: 12}, function (err, data) {
      res.render('main', {user: userData, title: 'tumblrHelper'});
    });
  })
});

router.get('/likes', function(req, res, next){
  console.log(req.query);

  client.userInfo(function(err, data){
    userData = data.user;
    client.blogLikes(
      userData.blogs[0].name+'.tumblr.com', 
      {
        offset: req.query.offset, 
        limit: req.query.limit
      }, 
      function (err, data) {
        res.render('likes', {posts: data.liked_posts});
    });
  })
})

module.exports = router;
