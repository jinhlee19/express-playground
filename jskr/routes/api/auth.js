const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
// 로그인에서 사용
const config = require('config');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
//// 웹토큰으로 사용자 인증

// @ Route      Get api/auth
// @ Desc       Test Route
// @ Access     Public

router.get('/', auth, async (req, res) => {
	try {
		// 이때, req.user의 user는 1. 토큰에서 받아온다. 2. middleware에서 decode된 값.
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//// 로그인

// @ Route      POST api/auth
// @ Desc       Register User
// @ Access     Public

router.post(
	'/',
	[
		body('email', '유효한 이메일을 입력해주세요.').isEmail(),
		body('password', '비밀번호를 입력해주세요.').exists(),
	],
	async (req, res) => {
		
		//// Body의 에러 확인
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		
		//// 이메일과 비밀번호로 로그인
		const { email, password } = req.body;
		
		try {
			
			// 아이디 등록여부 확인
			let user = await User.findOne({ email });
			if (!user) {
				// console.log(user);
				return res
				.status(400)
				.json({ error: [{ msg: '사용자 정보가 일치하지 않습니다.' }] });
			}

			// 비밀번호 일치
			const isMatch = await bcrypt.compare(password, user.password);
			if(!isMatch) {
				return res
				.status(400)
				.json({ error: [{ msg: '사용자 정보가 일치하지 않습니다.' }] });
			}

			// JWT Payload
			const payload = {
				user: {
					id: user.id,
				},
			};
			// JWT Sign
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 3600000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('서버 오류');
		}
	}
);

module.exports = router;
