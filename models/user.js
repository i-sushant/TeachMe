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
    isAdmin:{type:Boolean,default:false}
});
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);