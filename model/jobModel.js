const axios = require('axios');
require('dotenv').config();

let storedAccessToken = "1000.f67fd47ce372461593f66e96c4bba018.b806b25b9c794688c3b6e67cc4ee5c9e";

const getAccessToken = async ()=> {
  const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
    try {
      const response = await axios.post(tokenUrl,null,{
        params: {
          grant_type: 'refresh_token',
          client_id: process.env.ZOHO_CLIENT_ID,
          client_secret: process.env.ZOHO_CLIENT_SECRET,
          refresh_token:process.env.REFRESH_TOKEN, 
        },
      });
      console.log(response.data);
      return(response.data.access_token);
    } catch (error) {
      return(error)
    }
 };

 
const getJobs = async(req,res)=> {
    const apiUrl = 'https://recruit.zoho.com/recruit/v2/JobOpenings';
    try {
      if(!storedAccessToken){
        storedAccessToken=await getAccessToken();
      }

      const JobsResponse = await axios.get(apiUrl,{
          headers: {
          Authorization:`Zoho-oauthtoken ${storedAccessToken}`,
          },
      })
      res.status(200).send(JobsResponse);
    }
    catch(error){
        if(error.response.status===401){
          storedAccessToken=await getAccessToken();
          const JobsResponse = await axios.get(apiUrl,{
          headers: {
            Authorization:`Zoho-oauthtoken ${storedAccessToken}`,
          },
        })
        return res.status(200).send(JobsResponse.data);
      }
      console.error('Error:', error,error.message);
      res.status(500).send("Internal Server Error");
    }
  };

  const applyJobs = async(req,res)=> {
    const apiUrl = 'https://recruit.zoho.com/recruit/v2/Candidates';
    try {
      if(!storedAccessToken){
        storedAccessToken=await getAccessToken();
      }
      const candidateData=req.body
      const Response = await axios.post(apiUrl,candidateData,{
          headers: {
          Authorization:`Zoho-oauthtoken ${storedAccessToken}`,
          },
      })
      res.status(201).json({Message: "Candidate record Created Successfully"});
    }
    catch(error){
      console.error('Error:', error,error.message);
      res.status(500).send("Internal Server Error");
    }
  };
module.exports = {getJobs,applyJobs}
