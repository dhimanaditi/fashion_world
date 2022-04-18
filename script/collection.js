/* All functions to be called at loding time are at bottom */
gdata = ''              //Global products data
gdata2=''
gdata3=''
cartData = ''           //Cart data 
cartData2=''
cartData3=''
let url = window.localStorage.getItem("url")
let user = window.sessionStorage.getItem('user')
function LOAD() {
    console.log(user)
 

        //Get all products
        $.ajax({
            url: url + "/products",
            type: "GET",
            success: (posRes) => {
                gdata = posRes
                let x = '<div class = "row col-12">'
                for (let i = 0; i < gdata.length; i++) {                     //gdata.length
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


        //for product 2
        
        $.ajax({
            url: url + "/products2",
            type: "GET",
            success: (posRes) => {
                gdata2 = posRes
                let x = '<div class = "row col-12">'
                for (let i = 0; i < gdata2.length; i++) {                     //gdata.length
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



        //for products 3
       
        $.ajax({
            url: url + "/products3",
            type: "GET",
            success: (posRes) => {
                gdata3 = posRes
                let x = '<div class = "row col-12">'
                for (let i = 0; i < gdata3.length; i++) {                     //gdata.length
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
        
    //}
    //else{
      //  document.getElementById('wish').innerHTML = "Unauthorized user " 
        

    //}
  
   
}


function learnMore(id) {
    console.log(id)
    alert(gdata[id].p_desc)
   
}

function buyNow(id)
{
    addToCart(id)
   
   // addToCart(id2)
    //addToCart(id3)
    window.open("../html/buynow.html",'_parent')
}

function addToCart(id)
{
    console.log("Product id:- ",id)
    let cqty = 0
    let cartData = []
    let ix = ''
    let cartid = ''
    
  
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


       
           // showCart()
            
            
        },
        error:(errRes)=>{
            console.log(errRes)
        }
    })

}
/*
function addToCart(id2)
{
    console.log("Product id:",id2)
    let cqty2=0
    let cartData2=[]
    let ix2=''
    let cartid2=''
    $.ajax({
      url: url + "/cart" + "?q=" + user,  //get all products from cart for loggedin user
      type: "GET",
      success: (posRes) => {
          cartData2 = posRes
          for(let i = 0; i < cartData2.length; i++)
          {                
              if(cartData2[i].p_id == gdata2[id2].p_id && cartData2[i].byed == 0)
              {                                 
                  console.log("Comparison success qty = ",cartData2[i].qty)      
                  cqty2 = 1
                  ix2 = i
                  cartid2 = cartData2[i].id2                                                          
              }                
          }
          if(cqty2 == 1)   //if quanity is 1 product is present, update qty only otherwise make entry in cart
          {
              console.log("Present")
              let data2 = {}
              data2.uid = user
              data2.p_id = gdata2[id2].p_id        
              data2.qty = parseInt(cartData2[ix2].qty) + 1
              data2.byed = 0
              $.ajax({            
                  url : url+"/cart/"+cartid2,
                  type : "PUT",
                  data : data2,
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
              let data2 = {}
              data2.uid = user
              data2.p_id = gdata2[id2].p_id        
              data2.qty = 1
              data2.byed = 0                    
              $.ajax({
                  url : url+"/cart",
                  type : "POST",
                  data : data2,
                  success : (posRes) =>{
                      console.log(posRes)
                  },
                  error : (errRes) =>{
                      console.log(errRes)
                  }
              })
          }
  
  
     
         // showCart()
          
          
      },
      error:(errRes)=>{
          console.log(errRes)
      }
  })
}
*/
/*
function addToCart(id3)
{
    console.log("Product id:",id3)
    let cqty3=0
    let cartData3=[]
    let ix3=''
    let cartid3=''
    $.ajax({
      url: url + "/cart" + "?q=" + user,  //get all products from cart for loggedin user
      type: "GET",
      success: (posRes) => {
          cartData3 = posRes
          for(let i = 0; i < cartData3.length; i++)
          {                
              if(cartData3[i].p_id == gdata3[id3].p_id && cartData3[i].byed == 0)
              {                                 
                  console.log("Comparison success qty = ",cartData3[i].qty)      
                  cqty3 = 1
                  ix3 = i
                  cartid3 = cartData3[i].id3                                                          
              }                
          }
          if(cqty3 == 1)   //if quanity is 1 product is present, update qty only otherwise make entry in cart
          {
              console.log("Present")
              let data3 = {}
              data3.uid = user
              data3.p_id = gdata3[id3].p_id        
              data3.qty = parseInt(cartData3[ix3].qty) + 1
              data3.byed = 0
              $.ajax({            
                  url : url+"/cart/"+cartid3,
                  type : "PUT",
                  data : data3,
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
              let data3 = {}
              data3.uid = user
              data3.p_id = gdata3[id3].p_id        
              data3.qty = 1
              data3.byed = 0                    
              $.ajax({
                  url : url+"/cart",
                  type : "POST",
                  data : data3,
                  success : (posRes) =>{
                      console.log(posRes)
                  },
                  error : (errRes) =>{
                      console.log(errRes)
                  }
              })
          }
  
  
     
         // showCart()
          
          
      },
      error:(errRes)=>{
          console.log(errRes)
      }
  })
}
*/

function showCart() {
    if (user != '') { 
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
/*
    $.ajax({
        url: url + "/cart" + "?q=" + user,
        type: "GET",
        success: (posRes) => {
           
            let cartData2 = posRes
            //console.log("Cart data:- ",cartData)
            let x = '<div>'
            for (let i = 0; i < cartData2.length; i++) {     //iterate cart data
                if (cartData2[i].byed == 0) {    //check for product already purchased or not
                    for (let j = 0; j < gdata2.length; j++) {    //iterate products data
                        if (gdata2[j].p_id == cartData2[i].p_id) {   //map cart and products with p_id
                            let obj2 = gdata2[j]
                            x = x + `
                                <div class = 'row col-12'>
                                <div class='col-4'>
                                    <div class = ' card'>
                                        <img src = ${obj2.pic} class = 'card-img-top'>
                                        <div class = 'card-body'>
                                            <div class = "h2 card-title">${obj2.p_name} </div>  
                                            <div class = "h4 text-muted">${cartData2[i].qty}</div>                              
                                            <button onclick="reduceFromCart(${cartData2[i].id2},${cartData2[i].qty},${cartData2[i].p_id})" class="btn btn-outline-success btn-block btn-sm">Reduce</button>
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

*/
   
   
   
  
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


