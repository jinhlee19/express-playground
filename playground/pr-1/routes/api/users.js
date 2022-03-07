const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// @route   Get post/user (endpoint)
// @desc    Test Route
// @access  Public

router.post(
	'/',
	[
    check('name', '이름을 입력해주세요.').not().isEmpty(), 
    check('email', '이메일 주소를 입력해주세요.').isEmail(), 
    check('password', '비밀번호를 8자리 이상 입력해주세요.').isLength({min: 8}),
    ],
	(req, res) => {
		const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
	}
);

module.exports = router;
