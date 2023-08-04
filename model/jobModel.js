const axios = require('axios');

class JobModel {
  async getJobs(queryParams) {
    const apiUrl = 'https://people.zoho.com/people/api/timetracker/getjobs';
    
    try {
      const response = await axios.get(apiUrl,
     { 
    params: queryParams,
    headers:{'Authorization': token} 
    },);
      return response.result;
    } catch (error) {
      return error;
    }
  }
}

class JobDetailsModel {
    async getJobDetails(queryParams) {
      const apiUrl = 'https://people.zoho.com/people/api/timetracker/getjobdetails';
      
      try {
        const response = await axios.get(apiUrl,
       { 
      params: queryParams,
      headers:{'Authorization': token} 
      },);
        return response.result;
      } catch (error) {
        return error;
      }
    }
  }

module.exports = new JobModel();
module.exports=new JobDetailsModel();
