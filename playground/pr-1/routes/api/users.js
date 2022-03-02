const express = require('express');
const router = express.Router();

// @route   Get API/ Users
// @desc    Test Route
// @access  Public

router.get('/', (req,res) => res.send('Users Route'))