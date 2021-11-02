let mongoose = require("mongoose")

let avatarSchema = new mongoose.Schema({

	path: 
	{
		type: String,
		default: "/myfiche_assets/img/user/default.png"
	},

	privilege: 
	{
		type: Number, 
		default: 1
	}
})

module.exports = mongoose.model("Avatar", avatarSchema)
