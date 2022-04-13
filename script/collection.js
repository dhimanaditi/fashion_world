/* All functions to be called at loding time are at bottom */
gdata = ''              //Global products data
gdata2 = ''              //Global products 2 data
gdata3 = ''              //Global products 3 data
cartdata = ''           //Cart data 
let url = window.localStorage.getItem("url")
let user = window.sessionStorage.getItem('user')
function LOAD() {
    console.log(user)
  // if (user == null) { 
    //  document.getElementById('wish').innerHTML = "Welcome "+ user
  
   

        //Get all products
        $.ajax({
            url: url + "/products",
            type: "GET",
            success: (posRes) => {
                gdata = posRes
                let x = '<div class = "row col-12">'
                for (let i = 0; i < gdata.length; i++) {
                    x = x + `
                    <div class = 'col-4 '>
                        <div class = 'card'>
                            <img src = ${gdata[i].pic} class = 'card-img-top'>
                            <div class = 'card-body'>
                                <div class = "h2 card-title">${gdata[i].p_name} </div>
                                <div class = "h4 card-subtitle text-muted">${gdata[i].p_cost} </div>
                                <button onclick="learnMore('${i}')" class="btn btn-outline-info btn-block btn-sm">Learn More</button>
                                <button onclick="addToCart('${i}')" class="btn btn-outline-success btn-block btn-sm">Add to Cart</button>
                                <button onclick="buyNow('${i}')" class="btn btn-outline-success btn-block btn-sm">Buy Now</button>
                            </div> 
                        </div>
                    </div>
                    `
                }
                x = x + `</div>`
                document.getElementById('products').innerHTML = x
            },
            error: (errRes) => {
                console.log(errRes)
            }
        })
    //}
    //else{
      //  document.getElementById('wish').innerHTML = "Unauthorized user " 
        

    //}
    $.ajax({
        url: url + "/products2",
        type: "GET",
        success: (posRes) => {
            gdata2 = posRes
            let x = '<div class = "row col-12">'
            for (let i = 0; i < gdata2.length; i++) {
                x = x + `
                <div class = 'col-4 '>
                    <div class = 'card'>
                        <img src = ${gdata2[i].pic} class = 'card-img-top'>
                        <div class = 'card-body'>
                            <div class = "h2 card-title">${gdata2[i].p_name} </div>
                            <div class = "h4 card-subtitle text-muted">${gdata2[i].p_cost} </div>
                            <button onclick="learnMore('${i}')" class="btn btn-outline-info btn-block btn-sm">Learn More</button>
                            <button onclick="addToCart('${i}')" class="btn btn-outline-success btn-block btn-sm">Add to Cart</button>
                            <button onclick="buyNow('${i}')" class="btn btn-outline-success btn-block btn-sm">Buy Now</button>
                        </div> 
                    </div>
                </div>
                `
            }
            x = x + `</div>`
            document.getElementById('products2').innerHTML = x
        },
        error: (errRes) => {
            console.log(errRes)
        }
    })
    
    $.ajax({
        url: url + "/products3",
        type: "GET",
        success: (posRes) => {
            gdata3 = posRes
            let x = '<div class = "row col-12">'
            for (let i = 0; i < gdata3.length; i++) {
                x = x + `
                <div class = 'col-4 '>
                    <div class = 'card'>
                        <img src = ${gdata3[i].pic} class = 'card-img-top'>
                        <div class = 'card-body'>
                            <div class = "h2 card-title">${gdata3[i].p_name} </div>
                            <div class = "h4 card-subtitle text-muted">${gdata3[i].p_cost} </div>
                            <button onclick="learnMore('${i}')" class="btn btn-outline-info btn-block btn-sm">Learn More</button>
                            <button onclick="addToCart('${i}')" class="btn btn-outline-success btn-block btn-sm">Add to Cart</button>
                            <button onclick="buyNow('${i}')" class="btn btn-outline-success btn-block btn-sm">Buy Now</button>
                        </div> 
                    </div>
                </div>
                `
            }
            x = x + `</div>`
            document.getElementById('products3').innerHTML = x
        },
        error: (errRes) => {
            console.log(errRes)
        }
    })
}
function learnMore(id) {
    console.log(id)
    alert(gdata[id].p_desc)
   
}

function buyNow(id)
{
    addToCart(id)
    
    window.open("../html/buynow.html",'_parent')
}

function addToCart(id)
{
    
   
    console.log("Product id:- ",id)
    let cqty = 0
    let cartData = []
    let ix = ''
    let cartid = ''

    let cqty1 = 0
    let cartData1 = []
    let ix1 = ''
    let cartid11 = ''
    $.ajax({
        url: url + "/cart" + "?q=" + user,  //get all products from cart for loggedin user
        type: "GET",
        success: (posRes) => {
            cartData = posRes
            for(let i = 0; i < cartData.length; i++)
            {                
                if(cartData[i].p_id == gdata[id].p_id && cartData[i].byed == 0)
                {                                 
                    console.log("Comparison success qty = ",cartData[i].qty)      
                    cqty = 1
                    ix = i
                    cartid = cartData[i].id                                                          
                }                
            }
            if(cqty == 1)   //if quanity is 1 product is present, update qty only otherwise make entry in cart
            {
                console.log("Present")
                let data = {}
                data.uid = user
                data.p_id = gdata[id].p_id        
                data.qty = parseInt(cartData[ix].qty) + 1
                data.byed = 0
                $.ajax({            
                    url : url+"/cart/"+cartid,
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
            else    
            {
                console.log("Absent")
                let data = {}
                data.uid = user
                data.p_id = gdata[id].p_id        
                data.qty = 1
                data.byed = 0                    
                $.ajax({
                    url : url+"/cart",
                    type : "POST",
                    data : data,
                    success : (posRes) =>{
                        console.log(posRes)
                    },
                    error : (errRes) =>{
                        console.log(errRes)
                    }
                })
            }
            //showCart()
            
            
        },
        error: (errRes) => {
            console.log(errRes)
        }
    })    
    
    //for products 2
    $.ajax({
        url: url + "/cart" + "?q=" + user,  //get all products from cart for loggedin user
        type: "GET",
        success: (posRes) => {
            cartData = posRes
            for(let i = 0; i < cartData1.length; i++)
            {                
                if(cartData1[i].p_id == gdata2[id].p_id && cartData1[i].byed == 0)
                {                                 
                    console.log("Comparison success qty = ",cartData1[i].qty)      
                    cqty1 = 1
                    ix1 = i
                    cartid1 = cartData1[i].id                                                          
                }                
            }
            if(cqty1 == 1)   //if quanity is 1 product is present, update qty only otherwise make entry in cart
            {
                console.log("Present")
                let data1 = {}
                data1.uid = user
                data1.p_id = gdata2[id].p_id        
                data1.qty = parseInt(cartData[ix].qty) + 1
                data1.byed = 0
                $.ajax({            
                    url : url+"/cart/"+cartid,
                    type : "PUT",
                    data : data1,
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
                console.log("Absent")
                let data1 = {}
                data1.uid = user
                data1.p_id = gdata2[id].p_id        
                data1.qty = 1
                data1.byed = 0                    
                $.ajax({
                    url : url+"/cart",
                    type : "POST",
                    data : data1,
                    success : (posRes) =>{
                        console.log(posRes)
                    },
                    error : (errRes) =>{
                        console.log(errRes)
                    }
                })
            }
            //showCart()
            
            
        },
        error: (errRes) => {
            console.log(errRes)
        }
    }) 
    
   
}


function showCart() {
    if (user != null) { 
         document.getElementById('wish').innerHTML = "Welcome "+ user
    $.ajax({
        url: url + "/cart" + "?q=" + user,
        type: "GET",
        success: (posRes) => {
           
            let cartData = posRes
            //console.log("Cart data:- ",cartData)
            let x = '<div>'
            for (let i = 0; i < cartData.length; i++) {     //iterate cart data
                if (cartData[i].byed == 0) {    //check for product already purchased or not
                    for (let j = 0; j < gdata.length; j++) {    //iterate products data
                        if (gdata[j].p_id == cartData[i].p_id) {   //map cart and products with p_id
                            let obj = gdata[j]
                            x = x + `
                                <div class = 'row col-12'>
                                <div class='col-4'>
                                    <div class = ' card'>
                                        <img src = ${obj.pic} class = 'card-img-top'>
                                        <div class = 'card-body'>
                                            <div class = "h2 card-title">${obj.p_name} </div>  
                                            <div class = "h4 text-muted">${cartData[i].qty}</div>                              
                                            <button onclick="reduceFromCart(${cartData[i].id},${cartData[i].qty},${cartData[i].p_id})" class="btn btn-outline-success btn-block btn-sm">Reduce</button>
                                        </div> 
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
           
        },
        error: (errRes) => {
            console.log(errRes)
        }
    })

    //for products 2
    $.ajax({
        url: url + "/cart" + "?q=" + user,
        type: "GET",
        success: (posRes) => {
           
            let cartData = posRes
            //console.log("Cart data:- ",cartData)
            let x = '<div>'
            for (let i = 0; i < cartData.length; i++) {     //iterate cart data
                if (cartData[i].byed == 0) {    //check for product already purchased or not
                    for (let j = 0; j < gdata2.length; j++) {    //iterate products data
                        if (gdata2[j].p_id == cartData[i].p_id) {   //map cart and products with p_id
                            let obj = gdata2[j]
                            x = x + `
                                <div class = 'row col-12'>
                                <div class='col-4'>
                                    <div class = ' card'>
                                        <img src = ${obj.pic} class = 'card-img-top'>
                                        <div class = 'card-body'>
                                            <div class = "h2 card-title">${obj.p_name} </div>  
                                            <div class = "h4 text-muted">${cartData[i].qty}</div>                              
                                            <button onclick="reduceFromCart(${cartData[i].id},${cartData[i].qty},${cartData[i].p_id})" class="btn btn-outline-success btn-block btn-sm">Reduce</button>
                                        </div> 
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
           
        },
        error: (errRes) => {
            console.log(errRes)
        }
    })
  
   }
    else{
        document.getElementById('wish').innerHTML = "Unauthorized user " 
        

    }
    
}

function reduceFromCart(id, qty, p_id) {    
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
  //  alert("Logout")
    window.localStorage.clear()
    window.sessionStorage.clear()
    window.close()
}

LOAD()
showCart()


