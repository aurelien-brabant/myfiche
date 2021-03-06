let express = require('express'),
    router = express.Router({mergeParams: true}),
    passport = require('passport'),
    User = require('../models/user'),
    Fiche = require('../models/fiche'),
    FicheComment = require('../models/ficheComment')


router.post('/', async function(req, res){
	
	// In case where front-end validation fails to do its job
	if (req.body.comment.title.length < 10 || req.body.comment.title.length > 80 ||  req.body.comment.content.length < 30 || req.body.comment.content.length > 300 || !req.body.commentAgreeChart)
	{
		return res.redirect("/categories/"+req.params.catId+"/fiches/"+req.params.ficheId);
	}

	try {
		let newComment = await FicheComment.create(req.body.comment);
		newComment.date = Date.now();
		let fiche = await Fiche.findById(req.params.ficheId);
		newComment.author = req.user._id;
		let savedComment = await newComment.save();
		fiche.comments.push(newComment);
		await fiche.save();
		res.redirect("/categories/"+req.params.catId+"/fiches/" +req.params.ficheId + "#" + savedComment._id);
	}
	catch(err){
		console.log(err);
	}
	
});

router.get('/:commentId', async function(req, res){

	let userId = req.user._id;

	try{

		let commandSender = await User.findById(userId);
		let targetedComment = await FicheComment.findById(req.params.commentId).populate('author');
		let fiche = await Fiche.findById(req.params.commentId);
		
		// Checks if currently logged user is the same which has created the fiche (or is an admin)

		if (targetedComment && (String(commandSender._id) === String(targetedComment.author._id) || commandSender.privilege === 10))
		{
			await FicheComment.findOneAndDelete({_id: targetedComment._id});
		}		
	}
	catch(err)
	{
		
	}

	return res.redirect("/categories/" +req.params.catId+ "/fiches/" +req.params.ficheId);
})



module.exports = router;
