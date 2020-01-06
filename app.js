var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    rp = require("request-promise"),
    bbcode = require("./bbcode"),
    myficheFetcher = require("./fetchMyfiche")

/* connecting do database */
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/myficheDB', {useNewUrlParser: true});

/* app configuration */
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

bbParser = new bbcode();


/* ROUTES */

app.get("/", function(req, res){
	res.render("home");
});

app.get("/fetcholdmyfiche", function(req, res){
  mf = new myficheFetcher();

  mf.fetchAll(function(parsedData){
    parsedData.forEach(function(fiche){
      if (fiche.locked == 0)
      {

        Fiche.findOneAndUpdate({title: fiche.fiche_titre}, {title: fiche.fiche_titre, description: fiche.fiche_descr, content: fiche.contenu, image: "https://myfiche.fr/img_fiche/" +fiche.img}, {upsert: true}, function(err, newFiche){
          if (err)
          {
            console.log("Error : " +err);
          }
          else {
          }
        });
      }
    })
    res.redirect("/fiches");
  });

})



app.get("/fiches", function(req, res){
  Fiche.find({}, function(err, fiches){
    if (err){
      console.log("Error attempting to find fiches in the database :" +err);
    }
    else {
      res.render("fiches", {fiches : fiches});
    }
  });
});

app.get ("/fiches/contenu/:UID", function(req, res) {
  var ficheID = req.params.UID;
  Fiche.find({"_id" : ficheID}, function(err, fiches){
    if (err){
      console.log("ID not found :" +err);
      res.send("Désolé, cette fiche n'existe pas.")
    }
    else if (fiches.length === 1)
    {
      fiches[0].content = fiches[0].content.replace( /(<([^>]+)>)/ig, '');
      fiches[0].content = bbParser.BbcodeToHtml(fiches[0].content);
      fiches[0].content = fiches[0].content.replace(/\n/g, "<br>");
      res.render("ficheContent", {fiche: fiches[0]});
    }
    else {
      res.send("Désolé, cette fiche n'existe pas.")
    }
  });
});

app.get("/fiches/creer", function(req, res){
  res.render("ficheEditor", {action: "/fiches/creer", type: "Création d'une fiche"})
});

app.get("/fiches/editer/:UID", function(req, res){
  var ficheID = req.params.UID;
  Fiche.find({"_id" : ficheID}, function(err, fiches){
    if (err){
      console.log("ID not found :" +err);
    }
    else if (fiches.length === 1)
    {
      res.render("ficheEditor", {action: "/fiches/editer/" + ficheID, type: "Edition d'une fiche", fiche: fiches[0]})
    }
  });
});

var ficheSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    image: String
})

var Fiche = mongoose.model("Fiche", ficheSchema);

app.post("/fiches/creer", function(req, res){
  Fiche.create({title: req.body.ficheTitle, description: req.body.ficheDescription, content: req.body.ficheContent, image: req.body.ficheImage}, function(err, newFiche){
    if (err)
    {
      console.log("Error : " +err);
    }
    else {
      res.redirect("/fiches");
    }
  });
});

app.post("/fiches/editer/:UID", function(req, res){
  var ficheID = req.params.UID;

  Fiche.findOneAndUpdate({_id: ficheID}, { title: req.body.ficheTitle, description: req.body.ficheDescription, content: req.body.ficheContent, image: req.body.ficheImage}, function(err, doc){
    if (err) {
      res.send("Error :" +error);
    }
    else {
      res.redirect("/fiches/contenu/" +ficheID);
    }
  });


});

app.listen("3000", function(){
	console.log("Myfiche server is now running !");
});
