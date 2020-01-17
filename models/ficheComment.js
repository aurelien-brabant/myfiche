let mongoose = require('mongoose');


let ficheCommentSchema = new mongoose.Schema({

	title: String,
	content: String,

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	date: {
		type: Date,
		default: Date.now()
	}
 
})

module.exports = mongoose.model('ficheComment', ficheCommentSchema);
