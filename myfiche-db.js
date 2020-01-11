/* */

var mongoose = require("mongoose"),
    Fiche    = require("./models/fiche"),
    User     = require("./models/user")
    ;

module.exports =
{

  fiche: {

    createNew: async function(ficheData)
    {

      try {
        let fiche = await Fiche.create(ficheData);
        return fiche;    
      } 
      catch(err) {
        return err;
      } 

    },

    toggleHide: async function(ficheID) 
    {
      try {
        let fiche = await Fiche.findById(ficheID);
        fiche.visibility.hidden = !fiche.visibility.hidden;
        let savedFiche = await fiche.save();
        return savedFiche;
      }
      catch(err)
      {
        return err;
      }
    },

    delete: async function(ficheID){
      try 
      {
        let fiche = await Fiche.findByIdAndRemove(ficheID);
        return true;
      }
      catch(err)
      {
        return err;
      }
    }

  },



  findUser: async function(method, value, callback) {
    try {
      let result = await User.find({[method]: value});
      callback(result);
      return result;
    }
    catch(err) {
      console.log("MyficheDB - Cannot find " +value + " using " +method + " method.");
    }

  },

  changeUserPrivilege: async function(email, privilege, callback){
    try {
      let user = await User.findOne({email: email});
      user.privilege = privilege;

      let savedUser = await user.save();
      callback(savedUser);

    }
    catch(err) {

    }
  },


  findAllFiches : function(callback) {
    Fiche.find({}).populate('author').exec(function(err, fiches){
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
