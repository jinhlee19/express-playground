const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	objective: {
		type: String,
		required: false,
	},
	gender: {
		type: Boolean,
		require: false,
	},
	birthday: {
		type: Date,
		require: false,
	},
	locationInterest: [
		{
			location1: {
				type: String,
				required: true,
			},
			location2: {
				type: String,
				required: false,
			},
			location3: {
				type: String,
				required: false,
			},
		},
	],
	experience: [
		{
			title: {
				type: String,
				require: true,
			},
			company: {
				type: String,
				required: true,
			},
			status: {
				type: String,
				required: true,
			},
			from: {
				type: Data,
				require: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			desciption: {
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
				required: true,
			},
			fieldofstudy: {
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
	date: {
		type: Date,
		default: Date.now,
	},
});
// 개인 로그인 기본프로필: 이름 이메일 연락처 관심지역 프로필이미지
// 전체 프로필: 프로필이미지 이름 성별 이메일 생년월일 관심분야 기타자격증 경력 최종학력

module.exports = ProfileSchema = mongoose.model('users', ProfileSchema);
