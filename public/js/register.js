/*global $*/
function validEmail(){
  $(document).ready(function(){
    let email=$('#email').val();
  let emailFormat=/[a-zA-Z0-9\.]{2,}@[a-zA-Z\.]+\.(com|net|in)/gm;
  if(emailFormat.test(email)==false || email.indexOf('@')!==email.lastIndexOf('@')){
    email="";
    $('#invalidEmail').css("display","inline-block");
  }
  $('#email').keyup(function(){
      $('#invalidEmail').css("display","none");
    });
  });
}
// function validName(){
//   $(document).ready(function(){
//   let name=document.getElementById("fullname").value;
//   for(let i=0;i<name.length;i++){
//     if(!(isNaN(name.charAt(i)))){           
//           $('#invalidName').css("display","inline-block");
//         }
//   }
//   $('#fullname').keyup(function(){
//       $('#invalidName').css("display","none");
//     });
//   });
// }
function confirmPassword(){
  $(document).ready(function(){
    let pass1=document.getElementById("pass1").value;
    let pass2=document.getElementById("pass2").value;
    if(pass1!==pass2 && pass2.length>1 && pass1.length>1){
      $('#passwordMismatch').css("display","inline-block");
    }
    $('#pass2').keyup(function(){
    $('#passwordMismatch').css("display","none");
  });
  });
}