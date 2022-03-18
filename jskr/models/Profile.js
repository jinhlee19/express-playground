const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	status: {
		type: String,
	},
	charge: {
		type: String,
	},
	part: {
		// 강사, 교사, 시간강사 등에서 선택
		type: [String],
		required: true,
	},
	careerTotalPeriod: {
		type: String,
		required: true,
	},
	// 계산식으로 experience 부분에서 받아올것.
	experience: [
		{
			title: {
				type: String,
				required: true,
			},
			company: {
				type: String,
				required: true,
			},
			location: {
				type: String,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			period: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	education: [
		{
			school: {
				type: String,
				required: true,
			},
			degree: {
				type: String,
			},
			major: {
				type: String,
				required: true,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	certificates: [
		{
			date: {
				type: Date,
				required: true,
			},
			name: {
				type: Date,
				required: true,
			},
			issuedBy: {
				type: String,
				required: true,
			},
		},
	],
	bio: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
