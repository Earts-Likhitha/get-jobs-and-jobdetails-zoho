const axios = require('axios');
require('dotenv').config();

let storedAccessToken = null;

const getAccessToken = async (queryparams)=> {
  const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
  try {
    const response = await axios.post(tokenUrl,null,{
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        redirect_uri:process.env.ZOHO_REDIRECTURI,
        code : queryparams.code,
      },
    });
    console.log(response.data);
     return(response.data);
  } catch (error) {
    return(error)
  }
 };


 
const getJobs = async(req,res)=> {
    
    const apiUrl = 'https://recruit.zoho.com/recruit/v2/JobOpenings';
    const queryparams = req.query;
    
    try {
      if(!storedAccessToken){
        const {access_token} = await getAccessToken(queryparams);
        storedAccessToken=access_token;
      }
        const JobsResponse = await axios.get(apiUrl,{
          
          headers: {
            Authorization:`Zoho-oauthtoken ${storedAccessToken}`,
          },
        })
        res.send(JobsResponse.data);
  }
  catch(error){
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {getJobs}
