gdata = ''
cartdata = ''
let total = 0
let url = window.localStorage.getItem("url")
let user = window.sessionStorage.getItem('user')
function LOAD() {
    console.log(user)
    if (user != null) {
        document.getElementById('wish').innerHTML = "Dear " + user +" Finalye your purchase"
        $.ajax({
            url: url + "/products",
            type: "GET",
            success: (posRes) => {
                gdata = posRes
            },
            error: (errRes) => {
                console.log(errRes)
            }
        })
    }
    else
        document.getElementById('wish').innerHTML = "Unauthorised user"
}

LOAD()

function showCart() {   
    $.ajax({
        url: url + "/cart" + "?q=" + user,
        type: "GET",
        success: (posRes) => {
            let cartData = posRes
            console.log("Cart data:- ",cartData)
            let x = '<div class = "row">'
            for (let i = 0; i < cartData.length; i++) {     //iterate cart data
                if (cartData[i].byed == 0) {    //check for product already purchased or not
                    for (let j = 0; j < gdata.length; j++) {    //iterate products data
                        if (gdata[j].p_id == cartData[i].p_id) {   //map cart and products with p_id
                            let obj = gdata[j]
                            total += obj.p_cost * cartData[i].qty
                            x = x + `
                                <div class = 'col-4 my-3'>
                                    <div class = 'col card'>
                                        <img src = ${obj.pic} class = 'card-img-top'>
                                        <div class = 'card-body'>
                                            <div class = "h2 card-title">${obj.p_name} </div>  
                                            <div class = "h4 text-muted">${cartData[i].qty}</div>   
                                            <div class = "h4 text-primary">${obj.p_cost}</div>                           
                                            <button onclick="reduceFromCart(${cartData[i].id},${cartData[i].qty},${cartData[i].p_id})" class="btn btn-outline-success btn-block btn-sm">Reduce</button>
                                        </div> 
                                    </div>
                                </div>
                                `
                        }
                    }
                }
            }
            x = x + `</div>`
            document.getElementById('cart').innerHTML = x
            document.getElementById('total').innerHTML = "Total cost = "+total
        },
        error: (errRes) => {
            console.log(errRes)
        }
    })
}

showCart()

function reduceFromCart(id, qty, p_id) {
    //alert(JSON.stringify(id+" "+ qty+" "+ p_id))
    if(qty == 1)
    {
        //remove product from cart
        $.ajax({
            url : url+"/cart/"+id,
            type : "DELETE",
            success : (posRes) =>{
                console.log(posRes)
            },
            error : (errRes) =>{
                console.log(errRes)
            }
        })
    }
    else
    {
        //reduce qty by 1
        let data = {}
        data.qty = qty - 1
        data.id = id
        data.p_id = p_id
        data.user = user
        data.byed = 0
        $.ajax({            
            url : url+"/cart/"+id,
            type : "PUT",
            data : data,
            success : (posRes) =>{
                console.log(posRes)
            },
            error : (errRes) =>{
                console.log(errRes)
            }
        })
    }
    showCart()
}

function logout()
{
    alert("Logout")
    window.localStorage.clear()
    window.sessionStorage.clear()
    window.close()
}

function checkout()
{
    let cartData = {}
    $.ajax({
        url: url + "/cart" + "?q=" + user,
        type: "GET",
        success: (posRes) => {
            cartData = posRes
            console.log("Cart data:- ",cartData)    
            for(let i = 0; i< cartData.length; i++)
            {
                cartData[i].byed = 1
                $.ajax({            
                    url : url+"/cart/"+cartData[i].id,
                    type : "PUT",
                    data : cartData[i],
                    success : (posRes) =>{
                        console.log("Updated cart",posRes)
                    },
                    error : (errRes) =>{
                        console.log(errRes)
                    }
                })
            }                       
        },
        error: (errRes) => {
            console.log(errRes)
        }
    })
    console.log("Updated cart data:- ",cartData)
    
    //alert("Thankyou visit again")
    //logout()
}