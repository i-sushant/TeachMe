let express       = require("express");
var router  = express.Router({mergeParams: true});
let Posts            = require("../models/posts"),
Answer           = require("../models/answer"),
middleware       = require("../middleware");
 

router.get("/new",middleware.isLoggedIn,function(req,res){
    Posts.findById(req.params.id,function(err,posts){
        if(err){
            req.flash("error","Something went wrong");
            res.redirect("back");
        }
        else{
            res.render("answers/new",{posts:posts});
        }
    });
});
router.post("",middleware.isLoggedIn,function(req,res){
    Posts.findById(req.params.id,function(err,post){
       if(err){
           req.flash("error","Something went wrong");
           res.redirect("back");
       } 
       else{
        Answer.create(req.body.answer,function(err,answer){
       if(err){
          req.flash("error","Something went wrong");
       }
       else{
           console.log(req.user.username);
           answer.author.id=req.user._id;
           answer.author.username=req.user.username;
           answer.postId=req.params.id;
           answer.save();
           post.answer.unshift(answer);
           post.save();
           req.flash("success","Successfully added answer");
           res.redirect("/posts/"+post._id);
          }
       });    
       }
    });
});
router.get("/:answer_id/edit",middleware.isLoggedIn,middleware.checkAnswerOwner,function(req,res){
  Posts.findById(req.params.id,function(err,post){
    if(err || !post){
      req.flash("error","Post not found");
      return res.redirect("/posts")
    }
     Answer.findById(req.params.answer_id,function(err,answer){
     if(err || !answer){
         req.flash("error","Answer not found");
         res.redirect("bac");
     } else{
         res.render("answers/edit",{posts:req.params.id,answer:answer});
     }
  });
  })
 
});
router.put("/:answer_id",middleware.isLoggedIn,middleware.checkAnswerOwner,function(req,res){
    Answer.findOneAndUpdate({_id:req.params.answer_id},req.body.answer,function(err,answer){
       if(err){
           req.flash("error","Something went wrong");
           res.redirect("back");
       }
       else{
           req.flash("success","Successfully updated answer");
           res.redirect("/posts/"+req.params.id);
       }
   })  
});
router.delete("/:answer_id",middleware.isLoggedIn,middleware.checkAnswerOwner,function(req,res){
   Answer.findByIdAndDelete(req.params.answer_id,function(err,foundAns){
      if(err){
          req.flash("error","Something went wrong");
          res.redirect("back");
      } else{
        Posts.findById(foundAns.postId,function(err,post){
          if(err){
            req.flash("error","Something went wrong");
            return res.redirect("back");
          }
          post.answer.splice(post.answer.indexOf(req.params.answer_id),1);
          post.save();
          req.flash("success","Successfully deleted answer");
          res.redirect("/posts/"+req.params.id);
        })
         
      }
   });
});
module.exports=router;