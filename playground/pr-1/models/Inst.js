// 기관 로그인
// 기관명, 구분, 주소, 전화번호, 홈페이지.
/* 단 프론트에서는 ... 시설로그인
시설 → 구인폼 참고 (기관명, 구분, 주소, 전화번호, 사업자번호, 홈페이지) 또는 api 이용 선택. 
[API](https://www.notion.so/API-86939f7f541a4b97b1b5fd20bfcc3a12) 
- 유치원알리미 api 사용시, 지역 - 유치원명 - 선택하면 자동 정보 찾기리스트  (정보공시 기준)
- 기관 전화로 인증 또는 확인전화
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstSchema = new Schema({
	// user: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'users',
	// },
	// 구분: 사립사인 / 사립법인 / 공립단설 / 공립병설 
	division: {
		type: String,
		required: true,
	},
	
	location: {
		type: String,
		required: true,
	},
	officeNumber: {
		type: String,
		
	},
	personalNumber: {
		type: String,
	},
	website: {
		type: String,
	},
});


module.exports = Institution = mongoose.model('user', InstSchema);
