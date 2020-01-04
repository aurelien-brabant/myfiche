var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    rp = require("request-promise"),
    bbcode = require("./bbcode");

/* connecting do database */
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/myficheDB', {useNewUrlParser: true});

/* app configuration */
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));




/* ROUTES */

app.get("/", function(req, res){
	res.render("home");
});



app.get("/fiches", function(req, res){
  Fiche.find({}, function(err, fiches){
    if (err){
      console.log("Error attempting to find fiches in the database :" +err);
    }
    else {
      bbParser = new bbcode();
      console.log(bbParser.htmlToBbcode("<strong>foo</strong> <u>and</u> <em>lol</em> <strong>bar</strong>"));
      console.log(bbParser.BbcodeToHtml("[i]Ceci est italique[/i] [b]Ceci est gras[/b] [s]Ceci soulignaient[/s]"));
      res.render("fiches", {fiches : fiches});
    }
  });
});

app.get("/fiches/creer", function(req, res){
  res.render("ficheEditor")
});

var ficheSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String
})

var Fiche = mongoose.model("Fiche", ficheSchema);

app.post("/fiches/creer", function(req, res){
  Fiche.create({title: req.body.ficheTitle, description: req.body.ficheDescription, content: req.body.ficheContent}, function(err, newFiche){
    if (err)
    {
      console.log("Error : " +err);
    }
    else {
      res.redirect("/fiches");
    }
  });
});

app.listen("3000", function(){
	console.log("Myfiche server is now running !");
});
