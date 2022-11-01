const express = require('express');
const mongoose = require('mongoose');
const app = express();
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

const userRoute=require('./routes/userRoute');
const postRoute=require('./routes/postRoute');

const mongoURL= 'mongodb+srv://m3huzaifa1:Huzaifa123@m3huzaifa1.uwkb6rb.mongodb.net/our_app';
const connect = mongoose.connect(mongoURL,{useUnifiedTopology: true, useNewUrlParser: true});

connect.then(()=>{
    console.log('Connected to MongoDB server');
  },(err)=>{
    console.log(err);
  });
  
app.use(logger('dev'));
app.use(express.json({limit : '25mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);


const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == 'production')
{
  app.use('/',express.static('client/build'))

  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
  });
}
app.listen(port,()=> console.log(`Server is running on port ${port}`));
