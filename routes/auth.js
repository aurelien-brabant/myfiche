let express = require('express'),
    router = express.Router({mergeParams: true}),
    passport = require('passport'),
    User = require('../models/user')


router.get('/', function(req, res){
	res.render("home");
});


router.get('/register', function(req, res){
	res.render('register');
});

router.post('/register', function(req, res){
	User.register(new User({email: req.body.email, username: req.body.username}), req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect('/');
		})
	})
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
}), function(req, res){

});

router.get('/login', function(req, res){
	res.render('login');
});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});




module.exports = router;