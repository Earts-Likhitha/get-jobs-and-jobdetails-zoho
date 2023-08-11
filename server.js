const express = require('express');
const jobRoutes = require('./routes/jobRoutes');
require('dotenv').config(); 

const app = express();  
const port = 3000;

app.use(express.json());

app.use('/', jobRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
