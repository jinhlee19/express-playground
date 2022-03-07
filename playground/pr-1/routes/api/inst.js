const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   Get API/ Posts
// @desc    Test Route
// @access  Public

router.post(
	'/',
	[
        check('division', '형태').not().isEmpty(), 
        check('location', '주소를 입력해주세요.').not().isEmpty(),
    ],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array()});
		}
	}
);

module.exports = router;