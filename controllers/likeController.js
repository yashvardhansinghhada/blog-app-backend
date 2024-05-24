const Like =require("../models/likeModel");
const Post=require("../models/postModel");

exports.likePost=async (req,res)=>{
    try {
        const {post,user}=req.body;
        const like=new Like({
            post,user
        });
        //saved new comments into db
        const savedLike= await like.save();

        //find post by id ,add new comment to comment array

        const updatedPost= await Post.findByIdAndUpdate(post,
            {$push:{likes:savedLike._id}},{new:true})
            .populate("likes")
            .exec();
        res.json(
            {
                post:updatedPost,
            }
        );
        
    } catch (error) {
        res.status(500).json({
            error:"Error while creating comment"
        });
    }
};

exports.unlikePost=async (req,res)=>{
    try {
        const {post,like}=req.body;
        const deletedLike=await Like.findOneAndDelete({post:post, _id:like},);

        //updatePost

        const updatedPost=await Post.findByIdAndDelete(post,{$pull:{likes:deletedLike._id}},{new:true});
        res.json({
            post:updatedPost,
        });
   
    } catch (error) {
        res.status(500).json({
            error:"Error while creating comment"
        });
    }
}