var express = require("express"),
    app = express(),
    rp = require("request-promise");

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", function(req, res){
	res.render("home");
});

app.get("/fiches", function(req, res){

  rp("https://myfiche.fr/api/service.php?apikey=myfiche_apikey&all=1")
  .then((body) => {
      var parsedData = JSON.parse(body);
      var visibleArray = [];

      parsedData.forEach(function(fiche){
          if (fiche.locked == '0')
          {
            visibleArray.push(fiche);
          }
      })
      console.log(visibleArray);
      res.render("fiches", {fiches:visibleArray});
  })
  .catch((err) => {
    console.log("An error occured while fetching!");
  });


});

app.listen("3000", function(){
	console.log("Myfiche server is now running !");
});
