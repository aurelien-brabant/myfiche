var mongoose = require("mongoose");

var ficheSchema = new mongoose.Schema({

  currentSave: {

    title: {
      type: String,
      default: ''
    },   

    description: {
      type: String,
      default: ''
    },

    content: {
      type: String,
      default: ''
    },

    image: {
      type: String,
      default: 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG'
    },

    last: {
      type: Date,
      default: Date.now()
    },

  },

  publishedContent: {
    title: {
      type: String,
      default: ''
    },   

    description: {
      type: String,
      default: ''
    },

    content: {
      type: String,
      default: ''
    },

    image: {
      type: String,
      default: 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG'
    }
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ficheComment'
    }
  ],

  drafts: [
    {
      title: String,
      description: String,
      content: String,
      image: String,
      number: Number
    }
  ],

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: undefined
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
