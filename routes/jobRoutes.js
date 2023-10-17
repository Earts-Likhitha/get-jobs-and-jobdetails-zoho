const express = require('express');
const {getJobs}=require('../model/jobModel')
const {applyJobs}=require('../model/applyJobs');

const router = express.Router();

router.get('/jobs',getJobs);
router.post('/apply',applyJobs);

module.exports = router;