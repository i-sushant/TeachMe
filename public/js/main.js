/*global $*/
function checkValid(){
  let email=document.getElementById('email').value;
  let pass=document.getElementById('pass').value;
  let emailFormat=/[a-zA-Z0-9\.]{2,}@[a-zA-Z\.]+\.(com|net|in)/gm;
  if(emailFormat.test(email)==false && email.length>1){
    email="";
    $('#invalid').css("display","block");
  }
  $('#email').keyup(function(){
      $('#invalid').css("display","none");
    });
}
