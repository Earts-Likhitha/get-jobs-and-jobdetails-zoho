
const jobModel = require('../model/jobModel');

class JobController {
  async fetchJobs(req, res) {
    try {
      const queryParams = req.query;
      const token = req.headers['authorization']
    
      const jobs = await jobModel.getJobs(queryParams,token);
      res.json(jobs);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchJobDetails(req,res){
    try {
        const queryParams = req.query;
        const token = req.headers['authorization']
      
        const jobDetails = await jobModel.getJobDetails(queryParams,token);
        res.json(jobDetails);
      } catch (error) {
        console.log(error);
      }
  }
}

module.exports = new JobController();