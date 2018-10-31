let mongoose   =require("mongoose");
let postSchema= new mongoose.Schema({
   question:String,
   description:String,
   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    answer:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Answer"
        }]
});
module.exports=mongoose.model("Posts",postSchema);