
const {getJobs,getJobDetails} = require('../model/jobModel');

const fetchJobs = async(req, res)=> {
    try {
      //const queryParams = req.query;
      const jobs = await getJobs();
      return res.json(jobs);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchJobDetails=async(req,res)=>{
    try {
        const queryParams = req.query;
        const jobDetails = await getJobDetails(queryParams);
        res.json(jobDetails);
      } catch (error) {
        console.log(error);
      }
  }


module.exports = {fetchJobs,fetchJobDetails};