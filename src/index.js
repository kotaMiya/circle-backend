/* eslint-disable no-console  */

import express from 'express';
import dbConfig from './config/db'; // get from ./config/db dir
import middleWearConfig from './config/middlewears'; // get from ./config/middlewears dir
import { CircleRoutes, UserRoutes } from './modules'; // get everything from modules dir

// use Express.
const app = express();

/**
 *  - Database - 
 */
dbConfig();

/**
 *  - Middlewear -
 */
middleWearConfig(app);

//  
app.use('/api', [CircleRoutes, UserRoutes]);

// Set PORT to 3000 or any other environment port. 
const PORT = process.env.PORT || 3000;

// App listening to port 3000 
app.listen(PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`App listening to port: ${PORT}`);
  }
});
