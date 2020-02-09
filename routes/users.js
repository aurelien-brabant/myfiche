let express =	require('express'),
	router  =	express.Router({mergeParams: true}),
	authMW  =	require('./authMiddlewares'),
	User =		require("../models/user.js"),
	path =		require('path'),
	fs =		require('fs')
 


/*
 * Show specific user profile
*/
router.get("/:userId", authMW.isLoggedIn, async function(req, res){

	let userId = req.params.userId
	let directoryPath = path.join(__dirname, "../public/myfiche_assets/img/user") 

	try 
	{
		let tUser = await User.findById(userId)
		fs.readdir(directoryPath, function(err, avatars)
		{
			if (err)
			{
				console.log(err);
			}

			if (tUser)
				return res.render("users/index", {tUser: tUser, avatars: avatars})
		})	
	}

	catch (err)
	{
		console.log(err)
		return res.render("404");
	}

})


module.exports = router;

