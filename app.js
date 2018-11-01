let express=require("express"),
    app=express(),
    mongoose=require("mongoose"),
    bodyParser=require("body-parser"),
    methodOverride=require("method-override"),
    User=require("./models/user"),
    Posts=require("./models/posts"),
    Answer=require("./models/answer"),
    middleware = require("./middleware/index"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local");
let answerRoutes    = require("./routes/answer"),
    postsRoutes = require("./routes/posts"),
    indexRoutes      = require("./routes/index");
    var multer = require('multer');
    var storage = multer.diskStorage({
      filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
      }
    });





mongoose.connect(process.env.DATABASEURL,{ useNewUrlParser: true });
//mongoose.connect("mongodb://sush:sush123@ds131313.mlab.com:31313/teachme",{ useNewUrlParser: true });
//mongoose.connect("mongodb://localhost/teachme_v6",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "This is a student teacher interaction app",
    resave: true,
    saveUninitialized: true
}));
 app.use(flash());
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());
 app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});


var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'sushantgupta33',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


app.use("/", indexRoutes);
app.use("/posts", postsRoutes);
app.use("/posts/:id/answer", answerRoutes);

app.get("/profile/:username",middleware.isLoggedIn,function(req,res){
    var questionArray=[];
    User.find({username:req.params.username},function(err,user){
        if(err || user.length<1){
            req.flash("error","User not found");
            res.redirect("/posts");
        }
        else{
            if(user[0].type==='Student'){
            Posts.find({"author.username":req.params.username},function(err,post){
               if(err){
                   req.flash("error","Something went wrong");
               }
               else{
                   res.render("profile/show",{user:user,post:post,page:"profile"});
               }

                });
                }
            else{
                Answer.find({"author.username":req.params.username},function(err,answer){
                if(err){
                       req.flash("error","Something went wrong");
                   }
                else{
                  res.render("profile/show",{user:user,answer:answer,post:questionArray,page:"profile"});
                    }

                 });
                }
        }
    });

});
app.post("/profile/:username",middleware.isLoggedIn,middleware.isProfileOwner,function(req,res){
   User.deleteOne({username:req.params.username},function(err,user){
      if(err || !user){
        req.flash("error","User not found");
        res.redirect("/");
      }
      else{
         req.flash("success","Successfully deleted profile!");
         res.redirect("/signup");
     }
   });
});
app.get("/profile/:username/changepic",middleware.isLoggedIn,middleware.isProfileOwner,function(req,res){
  User.find({username:req.params.username},function(err,user){
    if(err) {
      req.flash("error","User not found");
      res.redirect("/")
    } else {
      res.render("profile/newPic",{user:user});
    }
});
});
app.post("/profile/:username/changepic",middleware.isLoggedIn,middleware.isProfileOwner,upload.single('image'),function(req,res){
  cloudinary.uploader.upload(req.file.path, function(result) {
    let displayPic = result.secure_url;
    User.findOneAndUpdate({username:req.params.username},{displayPic : displayPic},function(err,user){
      if(err){
        req.flash("error","Something went wrong");
        res.redirect("back");
      }else{
        req.flash("success","Updated profile picture");
        res.redirect("/profile/"+req.params.username);
      }
    })
  });

});
app.listen(3000, "127.0.0.1", function(){
   console.log("The Server Has Started!");
});
