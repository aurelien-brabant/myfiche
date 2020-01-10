var mongoose = require("mongoose");

var Fiche = require("./fiche.js")
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  status : String,
  privilege: Number,

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
