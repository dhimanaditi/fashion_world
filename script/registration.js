


let url = "http://localhost:3000/users"

function LOAD()
{
   /*
    $.ajax({
        url : url,
        type :"GET",
        success : (posRes) => {
            console.log(posRes) 
             
        },
        error : (errRes) => {
            console.log(errRes)
        }
    })*/
}

LOAD()
//////////////////

$(document).ready(()=>{
   /*$("#getData").click((e)=>{
        e.preventDefault()
        LOAD()
    })*/

    $("#button").click((event)=>{
        let name=document.getElementById("u_name").value
        let lname =document.getElementById("u_ln").value
        let mail =document.getElementById("uid").value
        let psw =document.getElementById("u_psw").value
        if(name!=""&&lname!=""&&mail!=""&&psw!=""){

        
        event.preventDefault()

    }
    else
    {
        document.getElementById("alert").innerHTML="please filled out the field"
    }

        let record = {
            
            "u_name" : document.getElementById("u_name").value,
            "u_ln" : document.getElementById("u_ln").value,
            "uid" : document.getElementById("uid").value,
            "u_psw" : document.getElementById("u_psw").value
        }
        

       
        $.ajax({
            url:url,
            type:"POST",
            data:record,
            success : (posRes) =>{
                console.log(posRes)
                
                
            alert("your account is successfully created. please login!")
                    
                   
            },
            error : (errRes) =>{
                console.log(errRes)
            }
        })
   
    
        LOAD()
    }
   
    
)   
})
