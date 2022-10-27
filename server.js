const express = require('express');
const mongoose = require('mongoose');
const app=express();
const logger=require('morgan');

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

app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`Server is running on port ${port}`));
