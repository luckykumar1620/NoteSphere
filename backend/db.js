if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: __dirname + "/.env" });
}

//require("dotenv").config({ path: __dirname + "/.env" });

var mongoose = require('mongoose');


//const mongoUrl='mongodb://localhost:27017/NoteSphere';
const dbUrl = process.env.ATLAS_URL;

console.log("DB URL:", dbUrl);

const connectToMongo=async()=>{
   console.log("Trying to connect to MongoDB...");
    try{
        await mongoose.connect(dbUrl);
       console.log("connected to mongoDb successfully");
    }catch(error){
      console.error("mongoDb not connected!",error.message);
    }
  
}

module.exports= connectToMongo;