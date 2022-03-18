const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
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

module.exports = router;
