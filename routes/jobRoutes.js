const express = require('express');
const {getJobs}=require('../model/jobModel')

const router = express.Router();

router.get('/jobs',getJobs);
//router.get('/jobdetails',jobController.fetchJobDetails);

module.exports = router;