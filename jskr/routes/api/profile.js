const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//// 유저 프로필 받기

// @ Route      Get api/profile/me
// @ Desc       Get current users profile
// @ Access     Private

// (api/profile은 전체, api/profile/me 는 id일치)

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
