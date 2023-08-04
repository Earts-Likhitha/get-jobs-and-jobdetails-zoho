const express = require('express');
const jobController = require('../controller/jobController');

const router = express.Router();

router.get('/jobs',jobController.fetchJobs);
router.get('/jobdetails',jobController.fetchJobDetails);

module.exports = router;