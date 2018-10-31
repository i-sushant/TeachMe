var mongoose = require("mongoose");
var answerSchema =new mongoose.Schema({
    text: String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    postId:mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Answer", answerSchema);