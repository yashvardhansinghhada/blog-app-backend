const Post=require("../models/postModel");

exports.createPost=async (req,res)=>{
    try {
        const {title,body}=req.body;
        const post=new Post({
            title,body
        });
        //saved new comments into db
        const savedPost= await post.save();


        res.json(
            {
                post:savedPost,
            }
        );
        
    } catch (error) {
        res.status(500).json({
            error:"Error while creating Post"
        });
    }
};

exports.getAllPost=async (req,res)=>{
    try {
        
     const posts=await Post.find().populate("likes").populate("comments").exec();


        res.json(
            {
                posts
            }
        );
        
    } catch (error) {
        res.status(500).json({
            error:"Error while getting Post"
        });
    }
};