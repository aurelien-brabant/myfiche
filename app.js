let express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    myficheDB       = require("./myfiche-db"),
    User            = require('./models/user'),
    seedDB          = require('./seed')


let authRoutes = require('./routes/auth.js'),
    fichesRoutes = require('./routes/fiches.js'),
    pannelRoutes = require('./routes/pannel.js')


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
app.use("/fiches", fichesRoutes);
app.use("/pannel", pannelRoutes);

seedDB();





app.listen("3000", function(){
	console.log("Myfiche server is now running !");
});
