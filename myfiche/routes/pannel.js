let express = require('express'),
	router 	= express.Router({mergeParams: true}),
	myficheDB = require('../myfiche_modules/myfiche-db'),
	authMW = require('./authMiddlewares'),
	Fiche = require('../models/fiche'),
	Category = require('../models/category'),
	User = require('../models/user')


router.get("/", authMW.isLoggedIn, function(req, res){
	res.render('pannel/index');
})

router.get('/myFiches', authMW.isLoggedIn, async function(req, res){

	let fiches = await Fiche.find({}).sort({"publishedContent.title": 1}).populate('author').populate('category');

	res.render("pannel/myFiches", {fiches: fiches})
});

router.get('/newfiche', authMW.isLoggedIn ,async function(req, res){
	
	try 
	{
		let categories = await Category.find({});
		res.render("categories/fiches/new", {categories: categories});
	}

	catch(err)
	{
		console.log(err);
	}

});

router.get('/editor', authMW.isLoggedIn, function(req, res){
	var edit = req.query.edit;
	var _new = req.query.new;

	if (edit) {
		Fiche.findById(edit, function(err, fiche){
			return res.render('pannel/editor', {action: '/fiches/'+fiche._id, fiche: fiche});
		})	
	}

	if (_new) {
		return res.render('pannel/editor', {action: '/fiches', fiche: undefined});
	}

});

router.get('/admin', authMW.isLoggedAsAdmin, function(req, res){
	res.render('pannel/admin/index');
});

router.get('/admin/fiches', authMW.isLoggedAsAdmin, function(req, res){

	var passedAction = req.query.action;
	var parameter1 = req.query.p;
	var parameter2 = req.query.p2;
	

	myficheDB.findAllFiches(function(fiches){
		res.render('pannel/admin/fiches', {fiches: fiches, action: passedAction, parameter1: parameter1, parameter2: parameter2});
	});
});


/*
 * USERS ADMINISTRATION INTERFACE 
*/
router.get("/admin/users", authMW.isLoggedAsAdmin, async function(req, res){

	try 
	{
		let users = await User.find({})
		console.log(users);
		return (res.render("pannel/admin/users", {users: users}))
	}
	catch (err)
	{
		console.log(err);
	}


	return res.render("404")
});



module.exports = router;
