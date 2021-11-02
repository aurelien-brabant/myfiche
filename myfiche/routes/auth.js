let express = require('express'),
    router = express.Router({mergeParams: true}),
    passport = require('passport'),
    User = require('../models/user')
    Avatar = require('../models/avatar')


router.get('/', async function(req, res){

	let login = req.query.login;
	if (login)
	{
		try
		{
			req.user.lastConnexion = Date.now();
			await req.user.save();
		}
		catch (err)
		{
			console.log(err)
		}
	}
	res.render("home");
});


router.get('/register', function(req, res){
	res.render('register');
});

router.post('/register', async function(req, res){
	let defaultAvatar = await Avatar.findOne({path: "/myfiche_assets/img/user/default.png"})
	User.register(new User({email: req.body.email, username: req.body.username, avatar: defaultAvatar._id}), req.body.password, function(err, user){
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
	successRedirect: '/?login=success',
	failureRedirect: '/login',
}), function(req, res){
	console.log(req.user);
});

router.get('/login', function(req, res){
	res.render('login');
});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});




module.exports = router;
