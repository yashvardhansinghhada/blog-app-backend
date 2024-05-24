const mongoose=require("mongoose");
require("dotenv").config();

const connectWithDb=()=>{
    mongoose.connect(process.env.DATABASE_URL).then(console.log("MongoDb Connected Successfully"))
    .catch((err)=>{console.log("MongoDb not connected successfully"),
                   console.log(err),
                   process.exit(1)   
                })
};

module.exports=connectWithDb;