const express = require('express');
const { generateImage }= require('../control/controlOpenai');
const router = express.Router();

router.post('/generateImg', generateImage);

module.exports = router;
