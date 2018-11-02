let mongoose=require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");
let UserSchema=new mongoose.Schema({
    fullname :String,
    username:String,
    id : mongoose.Schema.Types.ObjectId,
    password : String,
    email:{type:String,unique:true},
    dob:String,
    type:String,
    department:String,
    uid:String,
    isTeacher:{type:Boolean,default:false},
    displayPic:{type:String,default:"https://res.cloudinary.com/sushantgupta33/image/upload/v1541162026/Profile_avatar_placeholder_large.png"}
});
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);
