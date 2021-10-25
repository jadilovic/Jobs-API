const mongoose = require('mongoose');

const JobSchema = mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, 'Please enter company name'],
			maxlength: 50,
		},
		position: {
			type: String,
			required: [true, 'Please enter position'],
			maxlength: 100,
		},
		status: {
			type: String,
			enum: ['interview', 'declined', 'pending'],
			default: 'pending',
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please enter user'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
