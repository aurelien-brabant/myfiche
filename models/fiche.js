var mongoose = require("mongoose");

var ficheSchema = new mongoose.Schema({

  title: String,
  description: String,
  content: String,

  image: {
    type: String,
    default: 'https://cdn.2020prosoftware.com/installations/common/img/image-not-found.png'
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },


  created: {
    type: Date,
    default: Date.now()
  },

  updated: {
    type: Date,
    default: Date.now()
  },

  rating: {
    up: {
      type: Number,
      default: 0 
    },
    down: {
      type: Number,
      default: 0 
    },
  },

  analytics: {
    views: {
      type: Number,
      default: 0
    }
  },

  visibility: {
    hidden: {
      type: Boolean,
      default: false
    }, 
    locked: {
      type: Boolean,
      default: false
    }
  },



})

module.exports = mongoose.model("Fiche", ficheSchema);
