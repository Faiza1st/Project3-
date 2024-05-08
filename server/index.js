import express from 'express';
import bodyParser from 'body-parser';
import connection from '../server/config/connection.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());


connection.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  