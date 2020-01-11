let express = require('express'),
	router 	= express.Router({mergeParams: true}),
	myficheDB = require('../myfiche-db'),
	authMW = require('./authMiddlewares')


router.get("/", authMW.isLoggedIn, function(req, res){
	res.render('pannel/index');
})

router.get('/myFiches', authMW.isLoggedIn, function(req, res){
	var passedAction = req.query.action;
	var parameter1 = req.query.p;
	var parameter2 = req.query.p2;

	myficheDB.findAllFiches(function(fiches){
		res.render('pannel/myFiches', {fiches:fiches, action: passedAction, parameter1: parameter1, parameter2: parameter2});
	});

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



module.exports = router;