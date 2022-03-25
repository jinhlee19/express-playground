const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
//// 유저 프로필 받기

// @ Route      Get api/profile/me
// @ Desc       Get current users profile
// @ Access     Private

// (api/profile은 전체, api/profile/me 는 id일치)
// 이때 auth 가 미들웨어
router.get('/me', auth, async (req, res) => {
	try {
		// mongoose method findOne
		// 프로필 스키마의 objectId를 req.user로 연결 - 토큰으로 받아오는 id를 연결.
		// populate 으로 'user' model의 name과 avatar를 불러온다. (parameter 순서 참고.)
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name', 'avatar']
		);
		if (!profile) {
			return res.status(400).json({ msg: '유저 프로필이 없습니다.' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('서버 오류');
	}
});

module.exports = router;

//// 유저 프로필 생성
// @route   Post api/profile
// @desc    Create or update user profile
// @access  Private

router.post(
	'/',
	[auth, [body('roles', '업무 분야를 입력해주세요.').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		// validation not pass
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// validation passes
		const {
			status,
			company,
			charge,
			roles,
			bio,
			title,
			location,
			description,
		} = req.body;
		// DB에 입력을 위한 프로필 필드 만들기. Build project object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (status) profileFields.status;
		if (company) profileFields.company;
		if (charge) profileFields.charge;
		if (bio) profileFields.bio;
		// (Array type)
		if (roles) profileFields.roles = roles.split(',').map(role => role.trim());
		// Test Point
		// console.log(profileFields.roles);
		// res.send('Hello');
		profileFields.experience = {};
		if (title) profileFields.experience.title = title;
		if (company) profileFields.experience.company = company;
		if (location) profileFields.experience.location = location;
		if (description) profileFields.experience.description = description;
		try {
			let profile = await Profile.findOne({ user: req.user.id });
			// user field is objectId 이므로...
			// console.log(req.user.id);
			// console.log(user.id);
			if (profile) {
				// 업데이트 ***
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					// user not defined 문제 해결함. typo
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}
			// 생성 - 기존 프로필이 없으므로.
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('프로필 생성 / 업데이트 서버 오류');
		}
	}
);

//// 유저 프로필 삭제
// @route   DELETE api/profile/:user_id
// @desc    유저 경력 추가
// @access  Private

router.delete('/', auth, async (req, res) => {
	try {
		await Profile.findOneAndRemove({ user: req.user.id });
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: '사용자 계정이 삭제처리 되었습니다.' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('서버 오류');
	}
});

//// 경력 추가
// @route   PUT api/profile/:exp_id
// @desc    유저 경력 추가
// @access  Private
router.put(
	'/experience',
	[body('title', '직책을 입력해주세요.').not().isEmpty()],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ errors: error.array() });
		}
		const { title, company, location, from, to, current, description } =
			req.body;
		const newExp = { title, company, location, from, to, current, description };
		try {
			const profile = Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExp);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('서버 오류');
		}
	}
);

//// 경력 삭제
// @route   Delete api/profile/:exp_id
// @desc    유저 경력 삭제
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = Profile.findOne({ user: req.user.id });
		const removeIndex = profile.experience
			.map(item => item.id)
			.indexOf(req.params.exp_id);
		profile.experience.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('서버 오류');
	}
});
