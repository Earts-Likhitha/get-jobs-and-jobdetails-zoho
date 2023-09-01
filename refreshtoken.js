const getAccessTokenFromRefreshToken = async (req,res)=> {
    const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
    const queryparams = req.query;
    try {
      const response = await axios.post(tokenUrl,null,{
        params: {
          grant_type: 'refresh_token',
          client_id: process.env.ZOHO_CLIENT_ID,
          client_secret: process.env.ZOHO_CLIENT_SECRET,
          refresh_token: queryparams.code,
          //code:process.env.ZOHO_CODE,
        },
      });
      console.log(response.data);
       return(response.data);
    } catch (error) {
      return(error)
    }
   };
  