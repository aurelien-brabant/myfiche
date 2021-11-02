let express =	require('express'),
	router  =	express.Router({mergeParams: true}),
	authMW  =	require('./authMiddlewares'),
	User =		require("../models/user.js"),
	Avatar =	require("../models/avatar.js")
 


/*
 * Show specific user profile
*/
router.get("/:userId", authMW.isLoggedIn, async function(req, res){

	let userId = req.params.userId

	try 
	{
		let tUser = await User.findById(userId).populate({path: "avatar"})
		let avatars = await Avatar.find({});
		console.log(tUser);

		if (tUser)
			return res.render("users/index", {tUser: tUser, avatars: avatars})
	}

	catch (err)
	{
		console.log(err)
		return res.redirect("404");
	}
})

router.post("/:userId/editAvatar", authMW.isLoggedIn, async function(req, res){

	let tUser = await User.findById(req.params.userId)
	if (tUser && (String(tUser._id) === String(req.user._id) || req.user.privilege == 10 ))
	{
		let avatarId = req.body.avatarId;
		if (avatarId) 
		{
			let avatar = await Avatar.findById(avatarId)
			if (avatar)
			{
				tUser.avatar = avatar._id
				await tUser.save()
				return res.redirect("/users/"+req.params.userId)
			}
		}

	}
})


module.exports = router;

