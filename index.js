const express= require("express");
const app=express();

require("dotenv").config();
const PORT= process.env.PORT || 3000;


app.use(express.json());

const connectWithDb=require("./config/database");
connectWithDb();

//routes
const blog=require("./routes/blog");
//mounting routes
app.use("/api/v1",blog);



app.listen(PORT,()=>{console.log(`App is running successfully ${PORT}`);});


app.get("/",(req,res)=>{
    res.send(`<h1>HEllo</h1>`)
})