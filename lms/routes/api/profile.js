const express = require('express');
const router = express.Router();
// @ Route      Get api/profile
// @ Desc       Test Route
// @ Access     Public

router.get('/',(req,res)=>{
    res.send('Profile Route');
});

module.exports = router;
