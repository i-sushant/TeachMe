  let express           = require("express"),
 router                = express.Router(),
 passport              = require("passport"),
 User                  = require("../models/user");
router.get("/",function(req,res){
   res.render("landing",{page:'home'});
});
router.get("/signup", function(req, res){
   res.render("register", {page: 'register'}); 
});

router.post("/signup",function(req,res){
    let fullname=req.body.firstname.trim()+" "+req.body.lastname.trim(),
        username=req.body.username.trim(),
        email=req.body.email.trim(),
        dob=req.body.dob,
        type=req.body.type,
        department=req.body.department,
        uid=req.body.uid;
    let newUser={fullname:fullname,username:username,email:email,dob:dob,type:type,department:department,uid:uid}
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            let error=err.message;
            if(err.code===11000){
                error="Email already registered";
        }
            req.flash("error",error);
            return res.render("register");
        }
            passport.authenticate("local")(req,res,function(){
            req.flash("success", "Successfully Signed Up! Nice to meet you " + newUser.fullname);
            res.redirect("/posts");
        });
    });
});
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});
router.post("/login", passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login",
}) ,function(req, res){
});
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/posts");
});
module.exports=router;