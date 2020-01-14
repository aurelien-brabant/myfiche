let express	 = require('express'),
 	router 	 = express.Router({mergeParams: true}),
 	myficheDB = require('../myfiche-db'),
 	Fiche = require('../models/fiche'),
  authMW = require('./authMiddlewares')


router.get('/new', authMW.isLoggedIn, function(req, res){
  res.render('fiches/new')
});

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
  Fiche.findById(ficheID).populate('author').exec(function(err, fiche){
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



// CREATE
router.post('/', authMW.isLoggedIn, async function(req, res){

  const fiche = await myficheDB.fiche.createNew({

    publishedContent: {
      title: req.body.ficheTitle,
      content: 'Ceci est le contenu par défaut de votre fiche. Il est temps pour vous de faire table rase et de montrer au monde vos talents de rédacteur :\')',
    },

    author: req.user._id,
    visibility: {
      hidden: true
    }

  });

  res.redirect('/pannel/editor?edit=' +fiche._id);

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
router.post("/:id", async function(req, res){

  let ficheID = req.params.id;

  let ficheData = req.body.fiche;
  // Way of updating - currentSave, publish or saveAsDraft
  let method = req.query.method;

  try
  {
    let fiche = await Fiche.findById(ficheID);

    if (method === 'currentSave')
    {
      fiche.currentSave = ficheData;
      fiche.currentSave.last = Date.now();
    }

    else if (method === 'publish')
    {
      fiche.publishedContent = ficheData;
    }

    let savedFiche = fiche.save(); 

    res.redirect('/fiches/' +ficheID)
  }

  catch(err)
  {
    console.log(err);
  }






  // Fiche.findById(ficheID, function(err, fiche){
  //   if (err)
  //   {
  //     console.log(err);
  //   }
  //   else
  //   {
  //     fiche.currentSave = req.body.fiche;
  //     fiche.save(function(err, savedFiche){
  //       console.log(savedFiche);
  //       res.redirect("/fiches/"+ficheID);
  //     })
  //   }

  // });
  

  // SAVEASDRAFT

  // else if (req.query.action === "saveAsDraft")
  // {
  //   Fiche.findById(ficheID, function(err, fiche){
  //     if (err) {
  //       console.log(err);
  //     }
  //     req.body.fiche.draft.number = fiche.drafts.length + 1;
  //     fiche.drafts.push(req.body.fiche.draft);
  //     fiche.save(function(err, savedFiche){
  //       console.log(savedFiche);
  //     })
  //   })

  //   return res.redirect("/fiches/"+ficheID);
  // }

  // else if (req.query.method === 'publish')
  // {
  //   Fiche.findOneAndUpdate({_id: ficheID}, req.body.fiche, function(err, doc){
  //     if (err) {
  //       res.send("Error : " + error);
  //     }
  //     else {
  //       res.redirect("/fiches/"+ficheID);
  //     }
  //   });
  // }


});

router.get("/:id/toggleHide", async function(req, res){

  let fiche = await myficheDB.fiche.toggleHide(req.params.id);

  if (req.query.from === "myFiches")
  {
    return res.redirect('/pannel/myFiches'+"?action=toggleHide"+"&p="+fiche.visibility.hidden+"&p2="+fiche.title+"#"+fiche._id);
  }

  res.redirect('/pannel/admin/fiches'+"?action=toggleHide"+"&p="+fiche.visibility.hidden+"&p2="+fiche.title+"#"+fiche._id);
})

router.get('/:id/delete', async function(req, res){
  let fiche = await myficheDB.fiche.delete(req.params.id)

  res.redirect('/pannel/admin/fiches'+"?action=delete");
});


/* ============================================ */

module.exports = router;