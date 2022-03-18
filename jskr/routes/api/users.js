const express = require('express');
const router = express.Router();
const config = require('config');
// gravatar, bcrypt, jwt
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');


//// REGISTER ROUTE 만드는 시간 ~

// @ Route      POST api/auth
// @ Desc       Register User
// @ Access     Public

router.post(
	'/',
	[
		body('username', '이름을 입력해주세요.').not().isEmpty(),
		body('email', '유효한 이메일을 입력해주세요.').isEmail(),
		body('password', '6자리 이상의 비밀번호를 입력해주세요.').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		//// VALIDATION
		const errors = validationResult(req);
		// ValidationResult()는 req로 넘어오는 값으로 body()의 유효성을 검증 후, 에러 발생시 배열로 반환한다. 
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//// REGISTER
		const { username, email, password } = req.body;
		
		try {
			// 아이디 등록여부 확인
			let user = await User.findOne({ email });
			if (user) {
				// console.log(user);
				return res
				.status(400)
				.json({ error: [{ msg: '이미 등록된 이메일입니다.' }] });
			}
			// 그라바타
			const avatar = gravatar.url(email, {
				// default size
				s: '200',
				r: 'pg',
				// default image
				d: 'mm',
			});
			// 유저 모델 (스키마를 통한 인스턴스화)
			user = new User({
				username,
				email,
				avatar,
				password,
			});

			// 비밀번호 암호화 - Bcrypt

			// Bcrypt의 genSalt, hash 등의 메서드는 promise를 반환한다. -> 모든 promise를 반환하는 것들에 await을 붙인다.
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			
			// USER를 DATABASE에 등록 - REGISTER 
			// Mongoose .save()도 promise 반환.
			await user.save();

			// // (임시 출력)
			// res.send('user Registered');

			
			// JWT Payload
			const payload = {
				user: {
					id: user.id,
				},
			};
			// JWT sign -> payload 
			// 1. Register a User 이후에 생성된 웹토큰을 돌려받는다. 
			// 2. 돌려받은 웹 토큰으로 다시 인증auth와 보호된 route의 access를 위해 전송한다. (middleware)
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				// 나중에 시간 바꿀 것! 3600 = 1 hr
				{ expiresIn: 360000 },
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
