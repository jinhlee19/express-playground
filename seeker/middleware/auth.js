const jwt = require('jsonwebtoken');
const config = require('config');

module.export = function (req, res, next) {
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(401).json({ msg: ' No token, authorization denied' });
	}
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decode.user;
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
