/*global $*/
$(document).ready(function(){
   $(".delete-profile").click(function(){
       $(".delete-opt").fadeIn();
   });
   $(".not-sure").click(function(){
      $(".delete-opt").fadeOut(); 
   });
});