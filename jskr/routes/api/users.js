const express = require('express');
const router = express.Router();

// Validator
const { body, validationResult } = require('express-validator');

//// REGISTER ROUTE 만드는 시간 ~

// @ Route      POST api/auth
// @ Desc       Register User
// @ Access     Public

router.post(
	'/',
	[
		body('name', '이름을 입력해주세요.').not().isEmpty(),
		body('email', '유효한 이메일을 입력해주세요.').isEmail(),
		body('password', '6자리 이상의 비밀번호를 입력해주세요.').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const error = validationResult(req);
		// validationResult는 req로 넘어오는 값으로 body()의 유효성을 검증 후, 에러 발생시 배열로 반환
		if (!error.isEmpty()) {
			return res.status(400).json({ errors: error.array() });
		}
		let user = User.findOne({ email });
		try {
			if (user) {
				console.log(user);
				return res
					.status(400)
					.json({ errors: [{ msg: '이미 등록된 이메일입니다.' }] });
			}
			// 여기서부터 아바타, bcrypt, jwt
			
		} catch (error) {
			console.error(err.message);
			res.status(500).send('서버 오류');
		}
	}
);

module.exports = router;
