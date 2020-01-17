/* */

var mongoose = require("mongoose"),
    Fiche    = require("./models/fiche"),
    User     = require("./models/user"),
    Category = require('./models/category')
    ;

module.exports =
{



/* ============================================ */
/*                   CATEGORY                   */
/* ============================================ */

  category: {

    createNew: async function(categoryData)
    {
      try {
        let category = await Category.create(categoryData);
        console.log('[Category] ' + category.title + ' has been created.');
        return category;
      }
      catch(err) {
        console.log(err);
      }
    },

    find: async function(method, value) 
    {
      try {
        let foundCategory = await Category.find({[method]: value});
        return foundCategory;
      }
      catch(err) {
        console.log(err);
      }
    },

    // Edit a category

    edit: async function(category, updateData) {
      try {
        // If category is an array of many categories

        if (Array.isArray(category))
        {
          for (category of category)
          {
            let categoryTitle = category.title
            await Category.update({_id: category._id}, updateData);
            console.log("[Category] " + categoryTitle + " has been updated.")
          }
        }

        // Else if this is a single category

        else if (category) 
        {
          let categoryTitle = category.title;
          await Category.update({_id: category._id}, updateData);
          console.log('[Category] ' + categoryTitle + 'has been updated.');
        }
      }
      catch(err) {
        console.log(err);
      }
    },

    // Delete a category

    delete: async function(category) {
      try {

        // If category is an array of many categories

        if (Array.isArray(category))
        {
          for (category of category)
          {
            let categoryTitle = category.title
            await Category.deleteOne({_id: category._id});
            console.log("[Category] " + categoryTitle + " has been deleted.")
          }
        }

        // Else if this is a single category

        else if (category) 
        {
          let categoryTitle = category.title;
          await Category.deleteOne({_id: category._id});
          console.log('[Category] ' + categoryTitle + 'has been deleted.');
        }

        return true;

      }
      catch(err) {
        console.log(err);
        return false;
      }   
    }

  },



/* ============================================ */
/*                   FICHES                     */
/* ============================================ */

  fiche: {

    createNew: async function(ficheData)
    {

      try {
        let fiche = await Fiche.create(ficheData);

        //Making first currentSave same as the original content

        fiche.currentSave = {
          title: fiche.publishedContent.title,
          description: fiche.publishedContent.description,
          content: fiche.publishedContent.content,
          image: fiche.publishedContent.image
        }

        let savedFiche = await fiche.save();
        return savedFiche;    
      } 
      catch(err) {
        return null;
      } 

    },

    find: async function(method, value, callback) {
      try {
        let result = await Fiche.find({[method]: value});
        callback(result);
        return result;
      }
      catch(err) {
        console.log("MyficheDB - Cannot find " +value + " using " +method + " method.");
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
