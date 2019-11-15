const express = require('express');
const router = express.Router();

router.use('/api/bikes', require('./bikes.routes'));

module.exports = router;
