let express = require('express'),
	router 	= express.Router({mergeParams: true}),
	myficheDB = require('../myfiche-db')


router.get("/", function(req, res){
	res.render('pannel/index');
})

router.get('/admin', function(req, res){
	res.render('pannel/admin/index');
});

router.get('/admin/fiches', function(req, res){
	myficheDB.findAllFiches(function(fiches){
		res.render('pannel/admin/fiches', {fiches: fiches});
	});
});

module.exports = router;