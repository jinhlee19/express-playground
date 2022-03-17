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
		const errors = validationResult(req);
		// validationResult는 req로 넘어오는 값으로 body()의 유효성을 검증 후, 에러 발생시 배열로 반환
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { username, email, password } = req.body;
		
		try {
			let user = await User.findOne({ email });
			if (user) {
				// console.log(user);
				return res
					.status(400)
					.json({ error: [{ msg: '이미 등록된 이메일입니다.' }] });
			}
			////  ****** 여기서부터 아바타, bcrypt, JWT
			// Avatar
			const avatar = gravatar.url(email, {
				// default size
				s: '200',
				r: 'pg',
				// default image
				d: 'mm',
			});
			// USER MODEL ** = 36열
			user = new User({
				username,
				email,
				avatar,
				password,
			});

			// Bcrypt - bcrypt.genSalt는 promise를 반환함. 모든 promise를 반환하는 것들에 await을 붙인다.
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			// user를 DB에 저장 / REGISTER . - .save()도 promise 반환.
			await user.save();

			res.send('user Registered');

			// // ****** JWT ******
			// // JWT Payload
			// const payload = {
			// 	user: {
			// 		id: user.id,
			// 	},
			// };
			// jwt.sign(
			// 	payload,
			// 	config.get('jwtSecret'),
			// 	{ expiresIn: 360000 },
			// 	(err, token) => {
			// 		if (err) throw err;
			// 		res.json({ token });
			// 	}
			// );
		} catch (err) {
			console.error(err.message);
			res.status(500).send('서버 오류');
		}
	}
);

module.exports = router;
