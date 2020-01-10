var mongoose = require("mongoose");

var ficheSchema = new mongoose.Schema({

  title: String,
  description: String,
  content: String,

  image: String,

  author: String,


  created: {
    type: Date,
    default: Date.now()
  },

  updated: {
    type: Date,
    default: Date.now()
  },

  rating: {
    up: Number,
    down: Number
  },

  /*
    "hidden" and "locked" are doing the same thing, but not for the same reason. Locked is performed by an administrator
    while hidden is user's choice relevant.
  */

  visibility: {
    hidden: Boolean, /* can be considered as draft state */
    locked: Boolean,
  },

})

module.exports = mongoose.model("Fiche", ficheSchema);
