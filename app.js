const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});


const connection = mongoose.connection;
connection.on('connected', () => {
    console.log("Mongodb connection established successfully");
})
connection.on('err',(err)=>{
    console.log("err connectig" + err);
})

require('./model/user');
require('./model/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(PORT,()=>{
    console.log("server running on port " + PORT);
})