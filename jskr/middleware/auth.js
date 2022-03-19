const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	// 헤더에서 토큰받기
	const token = req.header('x-auth-token');
	// 토큰 여부 확인 Check if no Token
	if (!token) {
		return res.status(401).json({ msg: '인증정보가 없습니다.' });
	}
	// 토큰 인증 - Verify Token
	try {
		const decode = jwt.verify(token, config.get('jwtSecret'));
		req.user = decode.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: '인증정보가 유효하지 않습니다.' });
	}
};

/*

* 이전에서 (routes/api/user.js의 JWT implement 부분에서는) *
    1. 유저 등록 
    2. 유저id - 페이로드를 갖는 json 웹토큰을 돌려받기

* 여기서는 (middleware/auth.js)*
    3. 돌려받은 토큰으로 보호된 라우트로 이동할 수 있는 권한을 받는다.*

*/
