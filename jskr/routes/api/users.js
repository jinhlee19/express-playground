const express = require('express');
const router = express.Router();

//// REGISTER ROUTE 만드는 시간 ~

// @ Route      POST api/auth
// @ Desc       Register User
// @ Access     Public

router.post('/', (req, res) => {
	// 이걸 실행하려면 middleware로 bodyparser 실행해야함.
	console.log(req.body);
	// 이게 없으면 로딩걸림
	res.send('User Route');
	
});

module.exports = router;
