let express	 = require('express'),
 	router 	 = express.Router({mergeParams: true}),
 	myficheDB = require('../myfiche-db'),
 	Fiche = require('../models/fiche')



/* ============================================ */
/*			       INDEX | SHOW                 */
/* ============================================ */

// INDEX 
router.get('/', function(req, res){
  myficheDB.findAllFiches(function(fiches){
    res.render('fiches/fiches', {fiches: fiches})
  })
});

// SHOW
router.get ('/:id', function(req, res) {
  var ficheID = req.params.id;
  Fiche.findById(ficheID, function(err, fiche){
    if (err){
      console.log('ID not found :' +err);
      res.send("Désolé, cette fiche n'existe pas.")
    }
    else
    {
      res.render('fiches/ficheContent', {fiche: fiche});
    }

  });
});

/* ============================================ */
/*			       NEW | CREATE                 */
/* ============================================ */

// NEW
router.get('/new', function(req, res){
  res.render("fiches/ficheEditor", {action: "/fiches", type: "Création d'une fiche"})
});


// CREATE
router.post('/', async function(req, res){

  const fiche = await myficheDB.createNewFiche({
    title: req.body.fiche.title,
    description: req.body.fiche.description,
    content: req.body.fiche.content
  });

  res.redirect('/fiches/' +fiche._id);

});

/* ============================================ */
/*			     EDIT | UPDATE                  */
/* ============================================ */


// EDIT
router.get("/:id/edit", function(req, res){
  var ficheID = req.params.id;
  Fiche.find({"_id" : ficheID}, function(err, fiches){
    if (err){
      console.log("ID not found :" +err);
    }
    else if (fiches.length === 1)
    {
      res.render("fiches/ficheEditor", {action: "/fiches/"+ficheID, type: "Edition d'une fiche", fiche: fiches[0]})
    }
  });
});

//UPDATE
router.post("/:id", function(req, res){
  var ficheID = req.params.id;

  Fiche.findOneAndUpdate({_id: ficheID}, { title: req.body.ficheTitle, description: req.body.ficheDescription, content: req.body.ficheContent, image: req.body.ficheImage}, function(err, doc){
    if (err) {
      res.send("Error : " + error);
    }
    else {
      res.redirect("/fiches/"+ficheID);
    }
  });
});


/* ============================================ */

module.exports = router;