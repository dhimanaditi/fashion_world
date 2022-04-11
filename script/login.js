
/*
let myInput = document.getElementById("u_psw");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");
console.log(myInput)
// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}


// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  let lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

  // Validate capital letters
  let upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  let numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}*/

//login code
let url = "http://localhost:3000"
window.localStorage.setItem("url",url)
function login()
    {            
        let uid = document.getElementById('uid').value
        let u_psw = document.getElementById('u_psw').value 
       
      
        $.ajax({
            url : url+"/users?q="+uid,
            type :"GET",
            
            success : (posRes) => {
                console.log(posRes) 
                              
                if(posRes.length>0 && posRes[0].u_psw === u_psw )
                {
                    //alert("Login Success")

                    window.sessionStorage.setItem('user',uid)
                  // window.sessionStorage.setItem('u_name',u_name)
                    window.open("../index.html")//window.open("../html/dashboard.html")
                }
                else
                    alert("Login Failed")
            },
            error : (errRes) => {
                console.log(errRes)                
            }
        })
    }
$(document).ready(()=>{
    $("#login").click((e)=>{
        e.preventDefault()
        login()
    })
})