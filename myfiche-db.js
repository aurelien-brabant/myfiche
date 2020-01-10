/* */

var mongoose = require("mongoose"),
    Fiche    = require("./models/fiche"),
    User     = require("./models/user")
    ;

module.exports =
{

  createNewFiche : async function(ficheData){
    try {
      let fiche = await Fiche.create(ficheData);
      return fiche;    
    } 
    catch(err) {
      return err;
    } 
  },

  findAllFiches : function(callback) {
    Fiche.find({}, function(err, fiches){
      if (err) {
        console.log(err);
      }
      else {
        callback(fiches);
      }
    })
  },

  /* ===== forEachFiche ===== */

  forEachFiche : function(callback)
  {
    Fiche.find({}, function(err, fiches){
      if (err) {
        console.log(err);
      }
      else {
        fiches.forEach(function(fiche){
          callback(fiche);
        })
      }
    });
  },

  /* ===== deleteAllFiches ===== */

  deleteAllFiches: function() {
    Fiche.find({}, function(err, fiches){
      if (err) {
        console.log(err);
      }
      else {
        if (fiches.length === 0) {
          console.log("[MYFICHEDB-DELETE] Nothing to delete. Seems that there's no fiches registered in the DB :p");
        }

        fiches.forEach(function(fiche){
          Fiche.findByIdAndRemove(fiche._id, function(removed){
            console.log("[MYFICHEDB-DELETE] " + fiche.title + " removed from DB.");
          })
        })
      }
    })
  }
  ,

}
