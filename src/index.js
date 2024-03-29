import "dotenv/config";
import express from 'express';
import route from './routes/publicRoute.js';
const app = express();
import cors from 'cors';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS middleware

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000', // Add the second port here
];
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));

// const URL = "sdfdjk"
// const URL = process.env.CONNECTION_STRING_MDB;
const URL="mongodb+srv://lalitg:lalitgour@cluster0.gyxdnnb.mongodb.net/mernstack?retryWrites=true&w=majority"
//const URL = "mongodb+srv://root:Monkey_db%40123@cluster0.in2io.mongodb.net"
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDb is connected"))
  .catch(err => console.log(err))

app.use('/', route);
const PORT = 4000;
app.listen(PORT || 4000, function () {
  console.log('Express app running on port ' + (PORT || 4000));
});
