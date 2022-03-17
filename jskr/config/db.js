const mongoose = require('mongoose');

const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		// await mongoose.connect(db);
        // 대신 new url파서를 사용하기 위해 설정. 아니면 deprecation warning걸림.
		await mongoose.connect(db, { useNewUrlParser: true });
		console.log('mongoDB connected.');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;

/* 
Note
Q) config의 역할과 기능 doc?
Q) config 패키지가 default 라는 파일명을 미리 세팅해서 받아오나?
- (db는 기존 devconnect의 db를 임시로 사용하자.)
- MongoDB 연결 참고 -  https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial 의 Connecting to MongoDB atlas
- .then.catch 로 할 수 있지만 트랜드에 따라 async로 하기로함. 
- async await 문은 trycatch로 에러잡아주기
*/
