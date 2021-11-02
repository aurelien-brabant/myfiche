let express = require('express'),
    router = express.Router({mergeParams: true}),
    passport = require('passport'),
    User = require('../models/user'),
    Fiche = require('../models/fiche'),
    FicheComment = require('../models/ficheComment'),
	authMW = require('./authMiddlewares');



async function registerRating(user, fiche, rateType)
{

	if (hasRated(user, fiche))
		return console.log("Cannot register rating : fiche already rated by this user.");

	if (rateType == 1)
		fiche.rating.up += 1
	if (rateType == -1)
		fiche.rating.down += 1;

	let registerObject = 
		{
			fiche: fiche._id,
			rateType: rateType
		}
	user.rated.push(registerObject);
	await user.save();
	await fiche.save();
}

function hasRated(user, fiche)
{
	for (ratedObject of user.rated)
	{
		if (String(ratedObject.fiche._id) === String(fiche._id))
			return ratedObject.rateType;
	}	
	return null
}

async function deleteRating(user, fiche)
{
	var i = 0;
	for (ratedObject of user.rated)
	{
		if (String(ratedObject.fiche._id) === String(fiche._id))
		{
			if (ratedObject.rateType == 1)
				fiche.rating.up -= 1;
			if (ratedObject.rateType == -1)
				fiche.rating.down -= 1;
			user.rated.splice(i, 1)
			await user.save()
			await fiche.save()
			return;
		}

		i += 1;
	}

	return console.log("Failed to delete rating of " +user.username+ " for fiche " +fiche.publishedContent.title+ ": there's no rating for this user.");

}



router.get("/", authMW.isLoggedIn,  async function(req, res){
	let action = req.query.action;
	let rateType = req.query.rateType;
	

	try 
	{
		let user = await User.findById(req.user._id).populate("rated[fiche]");
		let fiche = await Fiche.findById(req.params.ficheId);
		let rate = await hasRated(user, fiche)
		if (rate)
		{
			if (rate == rateType)
				await deleteRating(user, fiche)
			else
			{
				await deleteRating(user, fiche);
				await registerRating(user, fiche, rateType);
			}
		}
		else 
			await registerRating(user, fiche, rateType)
	
		res.redirect("/categories/"+req.params.catId+"/fiches/"+req.params.ficheId);
	}
	catch (err)
	{
		console.log(err);
	}
})


module.exports = router;

