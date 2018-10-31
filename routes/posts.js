let express = require("express"),
 router     = express.Router(),
 middleware = require("../middleware"),
 Posts      = require("../models/posts");
router.get("/",middleware.isLoggedIn,function(req,res){
    Posts.find({},function(err,posts){
      if(err || !posts){
          req.flash("error","Something went wrong");
          res.redirect("back");
      }  
      else{
       res.render("posts",{posts:posts,page:'posts'});   
      }
    });
});
router.post("/",middleware.isLoggedIn,function(req,res){
   let question=req.body.question;
   if(question.charAt(question.length-1)!='?')
    question=question.concat("?");
   let description=req.body.description,
   author={
       id:req.user._id,
       username:req.user.username
   },
   newPost={question:question,description:description,author:author};
   Posts.create(newPost,function(err,posts){
      if(err){
          req.flash("error","Something went wrong");
          res.redirect("back");
      } 
      else{
          req.flash("success","Successfully added question!");
          res.redirect("/posts");
      }
   });
});
router.get("/new",middleware.isLoggedIn,middleware.isTeacher,function(req,res){
   res.render("posts/new"); 
});
router.get("/:id",middleware.isLoggedIn,function(req,res){
    Posts.findById(req.params.id).populate("answer").exec(function(err,foundPost){
    if(err || !foundPost){
        req.flash("error","Something went wrong");
          res.redirect("back");
    }    
    else{
        res.render("posts/show",{posts:foundPost,currentUser:req.user});
    }
    });
});

router.get("/:id/edit",middleware.isLoggedIn,middleware.isTeacher,middleware.checkPostOwner,function(req,res){
    Posts.findById(req.params.id,function(err,posts){
       if(err){
           req.flash("error","Something went wrong");
          res.redirect("back");
       } 
       else{
           res.render("posts/edit",{posts:posts});
       }
    });
});
router.put("/:id",middleware.isLoggedIn,middleware.isTeacher,middleware.checkPostOwner,function(req,res){
   Posts.findOneAndUpdate({_id:req.params.id},req.body.posts,function(err,posts){
       if(err){
        req.flash("error","Something went wrong");
          res.redirect("back");
       }
       else{ 
        req.flash("success","Successfully updated question!");
        res.redirect("/posts/"+req.params.id);
       }
   });
});
router.delete("/:id",middleware.isLoggedIn,middleware.isTeacher,middleware.checkPostOwner,function(req,res){
   Posts.deleteOne({_id:req.params.id},function(err,posts){
     if(err){
         req.flash("error","Something went wrong");
          res.redirect("back");
     }  
     else{
         req.flash("success","Successfully deleted question!")
         res.redirect("/posts");
     }
   });
});
module.exports=router;