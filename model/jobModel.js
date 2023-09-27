const axios = require('axios');
require('dotenv').config();

let storedAccessToken = null;

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
      res.status(200).send(JobsResponse.data);
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

module.exports = {getJobs}
