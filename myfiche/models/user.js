var mongoose = require("mongoose");

var Fiche = require("./fiche.js")
var Avatar = require("./avatar.js")
var passportLocalMongoose = require('passport-local-mongoose');

let defaultAvatar = Avatar.findOne({path: "/myfiche_assets/img/user/default.png"})

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

	rated: 
	[
		{
			rateType:
			{
				type: Number,
				default: 0
			},

			fiche:
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Fiche",
			}
		}
	],

	avatar:
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Avatar",
	}

});

UserSchema.plugin(passportLocalMongoose, {usernameQueryFields: ['email']});

module.exports = mongoose.model("User", UserSchema);
