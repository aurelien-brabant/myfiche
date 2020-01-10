var mongoose = require("mongoose");

var Fiche = require("./fiche.js")
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,

  activated: {
    type: Boolean,
    default: true
  },

  privilege:  {
    type: Number,
    default: 0
  },

  created:
  {
    type: Date,
    default: Date.now()
  },

  lastConnexion:
  {
    type: Date,
    default: Date.now()
  },

});

UserSchema.plugin(passportLocalMongoose, {usernameQueryFields: ['email']});

module.exports = mongoose.model("User", UserSchema);
