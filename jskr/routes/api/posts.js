const express = require('express');
const router = express.Router();

// @ Route      Get api/auth
// @ Desc       Test Route
// @ Access     Public
router.get('/', (req, res) => {
    // console.log(req.body);
    res.send('Auth Route');
});

module.exports = router;
