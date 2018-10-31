var mongoose = require("mongoose");
var Posts = require("./models/posts");
var Answer   = require("./models/answer");
let posts=[
    {
        question:"What do you mean by TCP/IP?",
        description:"Bacon ipsum dolor amet filet mignon turducken shank ball tip bacon venison. Ham hock leberkas hamburger, buffalo venison strip steak pork landjaeger.",
        subject:"dccn"
    },
    {
        question:"What do you mean by quick sort?",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        subject:"ds"
    },
    {
        question:"What do you mean by OSI model?",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        subject:"dccn"
    },
    {
        question:"What do you mean by handshaking theorem?",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        subject:"dm"
    },
    {
        question:"What do you mean by high frequency response of BJT?",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        subject:"aec"
    }
    ]
 
function seedDB(){
  //Remove all campgrounds
  Posts.remove({}, function(err){
        if(err){
            console.log(err);
        }
        Answer.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            posts.forEach(function(seed){
                Posts.create(seed, function(err, post){
                    if(err){
                        console.log(err)
                    } else {
                        Answer.create(
                            {
                                text: "Once I took my armpit pic after shaving it. I was bit doubtful whether my armpits have been properly shaven or not.",
                                author: "Mr nobody"
                            },function(err, answers){
                                if(err){
                                    console.log(err);
                                } else {
                                    post.answer.unshift(answers);
                                    post.save();
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;