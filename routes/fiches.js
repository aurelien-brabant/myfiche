let express	 = require('express'),
	router 	 = express.Router({mergeParams: true}),
	myficheDB = require('../myfiche_modules/myfiche-db'),
	Fiche = require('../models/fiche'),
	authMW = require('./authMiddlewares'),
	Category = require('../models/category'),
	bbcode = require('../myfiche_modules/bbcode.js');


router.get('/new', authMW.isLoggedIn, async function(req, res){
	try {
		let categories = await Category.find({});
		res.render('fiches/new', {categories: categories})
	}
	catch(err){
		console.log(err);
	}

});

/* ============================================ */
/*			       INDEX | SHOW                 */
/* ============================================ */

// INDEX 
router.get('/', async function(req, res){
	let categoryID = req.params.catId;

	try {
		let category = await Category.findById(categoryID).populate({
			path:'fiches',
			populate: {
				path: 'author'
			}
		});

		if (!category)
			return (res.render("404"));

		res.render('categories/fiches/fiches', {fiches: category.fiches, category: category})
	}

	catch(err) {
		res.render("404");
	}
});

// SHOW
router.get ('/:id', async function(req, res) {
	var ficheID = req.params.id;
	let bbParser = new bbcode();
	bbParser.initializeBbcodeToHtml();
	try {
		let fiche = await Fiche.findById(ficheID).populate([
			{path: 'author'},
			{path: 'comments',
				options: {
					sort: {"date": -1}
				},
				populate: {
					path:'author'
				}
			}])
		if ( !fiche || (fiche.visibility.hidden &&  !( req.user && (String(req.user._id) === String(fiche.author._id) 
			|| req.user.privilege === 10) )))
			return ( res.render("404")  )
		let parsedContent  = bbParser.BbcodeToHtml(fiche.publishedContent.content);
		res.render('categories/fiches/show', {fiche: fiche, parsedContent: parsedContent})
	}
	catch(err) {
		res.render("404");
	}


});

/* ============================================ */
/*			       NEW | CREATE                 */
/* ============================================ */



// CREATE
router.post('/', authMW.isLoggedIn, async function(req, res){

	try
	{
		let category = await Category.findById(req.params.catId);
		let fiche = await Fiche.create({

			publishedContent: {
				title: req.body.ficheTitle,
				content: 'Ceci est le contenu par défaut de votre fiche. Il est temps pour vous de faire table rase et de montrer au monde vos talents de rédacteur :\')',
			},

			currentSave: {
				title: req.body.ficheTitle,
				content: 'Ceci est le contenu par défaut de votre fiche. Il est temps pour vous de faire table rase et de montrer au monde vos talents de rédacteur :\')',
			},

			author: req.user._id,
			visibility: {
				hidden: true
			},

			category: category._id
		});

		category.fiches.push(fiche);
		await category.save();

		return res.redirect("/categories/"+req.params.catId+"/fiches/"+fiche._id+"/edit");

	} 

	catch(err) {
		console.log(err);
		res.redirect('/');
	}

});

/* ============================================ */
/*			     EDIT | UPDATE                      */
/* ============================================ */


// EDIT
router.get("/:ficheId/edit", authMW.isLoggedIn, async function(req, res){

	let categoryId = req.params.catId;
	let ficheId = req.params.ficheId;
	var fiche;
	try 
	{
		categories = await Category.find({});

		fiche = await Fiche.findById(ficheId).populate([
		{
			path: "category"
		},
		{
			path: "author"
		}
		]);

		/* Checks if user owns the fiche or if it's super user  */
		if (String(req.user._id) === String(fiche.author._id) || req.user.privilege === 10)
			return res.render("categories/fiches/edit", {fiche: fiche, categories: categories});
	}
	catch(err)
	{
		console.log(err);
	}

	res.redirect('/');
});

/* 
	* UPDATE - fiche can be updated in two ways : currentSave or publish. 
	* Current save is like a smart draft : it's a way to live-register changes that are made without 
	* making them visible of everyone. It's used by the autosave feature  available in the fiche editor. It's handled by jQuery AJAX.
	* publish is used to make visible all the changes registered by the currentSave method. It's triggered when user click on the button
	* "publish changes".
*/
router.post("/:ficheId", authMW.isLoggedIn, async function(req, res){

	let ficheId	 = req.params.ficheId,
	categoryId	 = req.params.catId,
	ficheData	 = req.body.fiche,
	method		 = req.query.method
	try
	{
		let fiche = await Fiche.findById(ficheId).populate("author");;

		if (!(String(req.user._id) === String(fiche.author._id) || req.user.privilege === 10))
			return res.redirect("/");

		if (method === "currentSave")
		{
			fiche.currentSave = ficheData;
			fiche.currentSave.last = Date.now();
		}

		else if (method === "publish")
		{
			if ((ficheData.content.length >= 300 && ficheData.content.length <= 25000)
				&& (ficheData.title.length >= 10 && ficheData.title.length <= 100) )
			{
			fiche.publishedContent = ficheData;
			fiche.currentSave = ficheData;		
			}
		}
		else if (method === "changeCategory")
		{
			fiche.category = req.body.selectCategory
			let oldCategory = await Category.findById(categoryId).populate("fiches");
			let newCategory = await Category.findById(req.body.selectCategory);
			var i = 0;
			for (catfiche of oldCategory.fiches)
			{
				if (String(catfiche._id) === String(fiche._id))
					oldCategory.fiches.splice(i, 1);
				i += 1;
			}
	
			await newCategory.fiches.push(fiche._id);
			await newCategory.save();
			await oldCategory.save();
		}
		else if (method === "turnVisible")
		{
			/* Fiche can be turned visible only if minimal requirements are satisfied (minimum length for title and content) */
			if ((fiche.publishedContent.title.length >= 10 && fiche.publishedContent.title.length <= 100)
				&& (fiche.publishedContent.content.length >= 300 && fiche.publishedContent.content.length <= 25000))
				fiche.visibility.hidden = false
		}
		else if (method === "turnInvisible")
		{
			fiche.visibility.hidden = true
		}

		let savedFiche = await fiche.save(); 
	}

	catch(err) 
	{
		console.log(err); 
	}
		
	res.redirect("/categories/" +categoryId+ "/fiches/" +ficheId);

});


router.post('/:ficheId/delete', authMW.isLoggedIn, async function(req, res){
	try
	{
		let fiche = await Fiche.findById(req.params.ficheId).populate("author");
		if ( String(req.user._id) === String(fiche.author._id) || req.user.privilege === 10)
		{
			await Fiche.findOneAndDelete({_id:fiche._id});
			console.log("reached")
			return ( res.redirect('/pannel/myfiches') )
		}
	}
	catch(err)
	{
		console.log(err);
	}
	res.redirect('/');
});

router.get("*", function(req, res){
	return res.render("404");
})


/* ============================================ */

module.exports = router;
