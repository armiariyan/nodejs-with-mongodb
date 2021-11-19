require('dotenv').config()

import express from 'express';
import cors from 'cors';
import db from './config/database';
import route from './routes/index';

const app = express();

// For configuring cors
// const corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 
//   }

app.use(cors())

// Database connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));

app.use(express.json());
app.use('/', route);


// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});