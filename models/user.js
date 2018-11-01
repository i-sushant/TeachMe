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
    isAdmin:{type:Boolean,default:false},
    displayPic:{type:String,default:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
});
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);
