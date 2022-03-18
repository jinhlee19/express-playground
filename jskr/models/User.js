const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
	},
	fullname: { type: String },
	residence: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		require: Date.now,
	},
});

module.exports = User = mongoose.model('user', UserSchema);

/* 
REGISTER 할 수 있도록 model 만들기
모델 만들기 위해서 스키마를 먼저 만들어준다.

이후 ***
1. OO 년차 교사
2. OO 대 OO학과 학사 
형태로 resume.js의 값을 받아오는 필드를 추가.
*/
