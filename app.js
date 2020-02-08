let express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    myficheDB       = require('./myfiche_modules/myfiche-db'),
    User            = require('./models/user'),
    seedDB          = require('./myfiche_modules/seed'),
    myfiche         = require('./myfiche_modules/myfiche')


let authRoutes = require('./routes/auth.js'),
    fichesRoutes = require('./routes/fiches.js'),
    pannelRoutes = require('./routes/pannel.js'),
    categoriesRoutes = require('./routes/categories.js'),
    ficheCommentsRoutes = require('./routes/ficheComments.js'),
	infosRoutes = require("./routes/infos.js");

/* connecting do database */
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/myficheDB', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));

/* app configuration */
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: "Anything I want. How yeah!",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
})

// ROUTES 

app.use(authRoutes);
app.use("/categories/:catId/fiches", fichesRoutes);
app.use("/pannel", pannelRoutes);
app.use('/categories', categoriesRoutes)
app.use('/categories/:catId/fiches/:ficheId/comments', ficheCommentsRoutes)
app.use('/infos', infosRoutes)
app.get("*", function(req, res){
	return (res.render("404"))
})

/*
async function initalize() {
  try {
      await seedDB();
      await myfiche.fetchContentFromV3();
  }
  catch(err) {
    console.log(err);
  }

}

initalize();
*/




app.listen("3000", function(){
	console.log("Myfiche server is now running !");
});
