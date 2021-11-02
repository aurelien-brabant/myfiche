let express = require('express'),
    router = express.Router({mergeParams: true}),
    passport = require('passport'),
    User = require('../models/user')


router.get("/", function(req, res)
{
	res.render("infos/infos");
})

router.get("/nouvelleVersion", function(req, res)
{
	res.render("infos/nouvelleVersion");
})

router.get("/qui", function(req, res)
{
	res.render("infos/qui");
})

router.get("/charte", function(req, res)
{
	res.render("infos/charte");
})

router.get("/faq/identifiants", function(req, res)
{
	res.render("infos/faq/identifiants");
})

module.exports = router;



