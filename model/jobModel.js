const axios = require('axios');
require('dotenv').config();

//const getAccessToken = async () => {
  //const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';

//   try {
//     const response = await axios.post(tokenUrl,{
//       params: {
//         grant_type: 'authorization_code',
//         client_id: process.env.ZOHO_CLIENT_ID,
//         client_secret: process.env.ZOHO_CLIENT_SECRET,
//         redirect_uri:process.env.ZOHO_REDIRECTURI,
//         //code:process.env.ZOHO_CODE,
//         code: req.header['code']
//       },
//     });
//     console.log(response.access_token);
//     return response.access_token;
//   } catch (error) {
//     return error
//   }
// };

const getJobs = async(req,res)=> {
    
    const apiUrl = 'https://people.zoho.com/people/api/timetracker/getjobs';
    
    try {
      const accessToken = req.header['authorization']//await getAccessToken();
      const response = await axios.get(apiUrl, {
      //params: {...queryParams,
       headers: {
        Authorization:`Zoho-oauthtoken ${accessToken}`//req.header['authorization'],
       },
      });
      return res.json(response);
    } catch (error) {
      return error;
    }
  }


const getJobDetails=async(queryParams)=> {
      const apiUrl = 'https://people.zoho.com/people/api/timetracker/getjobdetails';
      
      // try {
      //   const response = await axios.get(apiUrl,
      //  { 
      // params: {queryParams,
      //   authToken:process.env.SECRET_TOKEN
      // }
      // },);
      //   return response.result;
      // } catch (error) {
      //   return error;
      // }
    }
  

module.exports = {getJobs,getJobDetails}
