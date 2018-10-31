let middlewareObj={};
let Posts=require("../models/posts"),
    Answer=require("../models/answer"),
    User= require("../models/user");
middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
middlewareObj.isProfileOwner=function(req,res,next){
    if(req.isAuthenticated()){
        User.find({username:req.params.username},function(err,user){
            if(err || !user) {
              res.flash("error","User not found");
              res.redirect("back");
            }
            else{
                if(req.user.username==user[0].username){
                    next();
                }
                else{
                  res.flash("error","You don't have permission to do that");
                  res.redirect("back");
                }
            }
        })
    }
    else{
            res.redirect("/posts");
        }
}
middlewareObj.checkPostOwner=function(req,res,next){
    if(req.isAuthenticated()){
        Posts.findById(req.params.id,function(err,post){
            if(err || !post){
                res.redirect("back");
            }
            else{
                if(post.author.id.equals(req.user._id)){
                 next();
                }
                else{
                  res.flash("error","You don't have permission to do that");
                  res.redirect("back");
                }
                    
                }
        });
    }
    else{
            res.redirect("/login");
        }
}
middlewareObj.checkAnswerOwner=function(req,res,next){
    if(req.isAuthenticated()){
        Answer.findById(req.params.answer_id,function(err,answer){
           if(err || !answer){
            req.flash("error","Answer not found");
            res.redirect("/posts");   
           } 
           else{
               if(answer.author.id.equals(req.user._id)){
                   next();
               } else {
                   res.redirect("back");
               }
           }
        });
    }
}
middlewareObj.isTeacher=function(req,res,next){
    if(res.locals.currentUser.type!="teacher"){
        return next();
    }
    res.redirect("/posts");
}
module.exports=middlewareObj;