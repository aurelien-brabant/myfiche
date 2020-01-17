var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({

	title: {
		type: String,
		default: "Undefined title"
	},
	description: {
		type: String,
		default: "Undefined description"
	},

	fiches: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Fiche"
		}
	]
})

module.exports = mongoose.model("Category", categorySchema);