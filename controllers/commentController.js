const Comment =require("../models/commentModel");
const Post=require("../models/postModel");

exports.createComment=async (req,res)=>{
    try {
        const {post,user,body}=req.body;
        const comment=new Comment({
            post,user,body
        });
        //saved new comments into db
        const savedComment= await comment.save();

        //find post by id ,add new comment to comment array

        const updatedPost= await Post.findByIdAndUpdate(post,
            {$push:{comments:savedComment._id}},{new:true})
            .populate("comments")
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
}