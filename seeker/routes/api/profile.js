const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');

// @route   Get api/profile/me (endpoint)
// @desc    Get current users profile
// @access  Private

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
		// Profile 모델의 user 필드의 ObjectId와 연결.
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json(profile);
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server Error');
	}
});

router.get('/', (req, res) => res.send('Profile Route'));

module.exports = router;
