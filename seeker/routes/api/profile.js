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
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name', 'avatar']
		);
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

router.post(
	'/',
	[
		auth,
		[
		check('status', 'Status is required').not().isEmpty(), 
		check('skills', 'Skills is required').not().isEmpty()
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		// validation not pass
		if (!errors.isEmpty()) {
			return res.status(400).son({ errors: errors.array() });
		}
		//validation passes
		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;

		// Build Profile Object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		// array type
		if (skills) {
			profileFields.skills = skills.split(',').map(skill => skill.trim());
		}
		// Build social object
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;
		// * mongoose 메서드 사용시 항상 앞에 await 사용
		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
				return res.json(profile);
			}
			// Create
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
			
		} catch (err) {
			console.error(err.message);
			res.status(500).send('server error');
		}

		console.log(profileFields.skills);
		res.send(profileFields.skills);
	}
);
