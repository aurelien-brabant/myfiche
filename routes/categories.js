let express	 = require('express'),
 	router 	 = express.Router({mergeParams: true}),
 	myficheDB = require('../myfiche_modules/myfiche-db'),
 	Fiche = require('../models/fiche'),
  	authMW = require('./authMiddlewares'),
  	Category = require('../models/category')


 router.get('/', async function(req, res){

 	try {
 		let categories = await Category.find({}).populate('fiches');
 		console.log(categories)
 		res.render('categories/categories', {categories: categories});
 	}
 	catch(err) {
 		return console.log(err);
 	}

 });

 // router.get('/:id/fiches', async function(req, res){

 // 	let categoryID = req.params.id;
 // 	console.log(categoryID);

 // 	try {
 // 		let category = await Category.findById(categoryID).populate({
 // 			path:'fiches',
 // 			populate: {
 // 				path: 'author'
 // 			}
 // 		});
 // 		console.log(category.fiches);
 // 		res.render('fiches/fiches', {fiches: category.fiches, category: category})
 // 	}

 // 	catch(err) {

 // 	}

 // });

 module.exports = router;