// ** 개인 로그인 기본프로필: 이름 이메일 연락처 관심지역 프로필이미지
// 전체 프로필: 프로필이미지 이름 성별 이메일 생년월일 관심분야 기타자격증 경력 최종학력
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose('user', UserSchema);
