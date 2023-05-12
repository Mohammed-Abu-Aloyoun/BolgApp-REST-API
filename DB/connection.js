const mongoose = require("mongoose");


const connectDB = async ()=>{
    return await mongoose.connect('mongodb://localhost:27017/BLOG')
      .then(res=>{
        console.log("connected");
      }).catch(err=>{
        console.log("fail to connect DB");
      });
}

module.exports = connectDB;