const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
// @route   Get post/user (endpoint)
// @desc    Test Route
// @access  Public

router.post(
	'/',
	[
		check('name', '이름을 입력해주세요.').not().isEmpty(),
		check('email', '이메일 주소를 입력해주세요.').isEmail(),
		check('password', '비밀번호를 8자리 이상 입력해주세요.').isLength({
			min: 8,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists.' }] });
			}
			const avatar = gravatar.url(email, {
				// default size
				s: '200',
				r: 'pg',
				// default image
				d: 'mm',
			});
			user = new User({
				name,
				email,
				avatar,
				password,
			});
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();
			// Return jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token }); // 200 response
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
