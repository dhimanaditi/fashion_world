class MyHeader extends HTMLElement
{
    constructor() {
        super();
      }
      connectedCallback() {
        this.innerHTML = `
            <style>
            @media only screen and ( max-width:576px)
            {
            .announcement_bar_section{
                background-color:black;
                color:white;
                display:block;
            }}
            .announcement_bar_section{
                background-color:black;
                color:white;
                display:block;
            }
            p.announcement_bar_content.Heading {
                padding: 12px 15px;
                margin: 0 auto;
                text-align: center;
                font-family:'Courier New', Courier, monospace;
            }
            .container-xxl{
                width:100%;
              
                margin-right:auto;
                margin-left:auto;
            }
            body{
                margin:0;
            }
            /*menu icon*/
            .container {
  display: inline-block;
  cursor: pointer;
  margin:20px;
}

.bar1, .bar2, .bar3 {
  width: 35px;
  height: 5px;
  background-color: rgb(59, 58, 58);
  margin: 6px 0;
  transition: 0.4s;
}

.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

.change .bar2 {opacity: 0;}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}
.header-section{
    position:sticky;
    width: 100%;
    display: flex;
    border-bottom: 1px solid gray;
}
.logo{
   
    width: 20%;
}
.header-section-right{
    text-align: end;
    justify-content: flex-end;
    align-items: center;
    width: 40%;
    display:flex;
}
.header-section-left{
    width: 40%;
    display: flex;
    align-items: center;
}
.inner-div{
    background-color:rgb(100, 102, 100);
    color:white;
    width:20%;
    margin: 10px;
    padding: 10px;
    text-align: center;
}
#quicklinks-main {
    display: flex;
}

.quicklink {
    display: flex;
    width: 100%;
}

.clction-link{
    text-decoration:none;
    color:white;
}
.store-link {
    text-decoration: none;
    color: white;
    margin: 30px;
    
    background-color: rgb(128, 123, 123);
    border: 1px solid;
    padding: 10px;
}
.logo-link{
    text-decoration: none;
    color:black;

}
.logo {
    
    text-align: center;
}
h1.logo-heading {
    font-size: 1.5em;
    /*font-family:;*/
}
.wishlist, .cart, .search, .account{
    text-decoration: none;
    color: white;
    
    background-color: rgb(128, 123, 123);
    border: 1px solid;
    padding: 10px;
}
      }
            </style>
            <div class="announcement_section">
            <section class="announcement_bar_section">
                <div class="announcement_bar">
                    <div class="announcement_bar_wrapper">
                        <p class="announcement_bar_content Heading">FREE STANDARD SHIPPPING ORDERS OVER  &#x20B9;1000+</p>
                    </div>
                </div>
            </section>
            </div>
            <div class="header-section">
                <div class="header-section-left">
                
                <div class="link"><a class="store-link" href="index.html">FIND OUR STORE</a></div>
                </div>
             
              <div class="logo"><h1 class="logo-heading"><a class="logo-link" href="../index.html">FASHION WORLD</a></h1></div>
              <div class="header-section-right">
              <h5 class="wish"></h5>
                  <a class="account" href="../html/login.html" >A</a>
                  
                  <a class="cart" href="../html/cart.html" >C</a>
              </div>
            </div>
           
        `;
}
}
customElements.define("my-header", MyHeader);


class MyMenu extends HTMLElement
{
    constructor() {
        super();
      }
      connectedCallback() {
        this.innerHTML = `
        <style>
        .inner-div{
            background-color:rgb(100, 102, 100);
            color:white;
            width:20%;
            margin: 10px;
            padding: 10px;
            text-align: center;
        }
        #quicklinks-main {
            display: flex;
        }
        
        .quicklink {
            display: flex;
            width: 100%;
        }
        
        .clction-link{
            text-decoration:none;
            color:white;
        }
        </style>
<div id="quicklinks-main">
<div class="quicklink">
    <div class="inner-div"><a class="clction-link" href="./tops.html">SHOP TOPS</a></div>
    <div class="inner-div"><a class="clction-link" href="./dresses.html">SHOP DRESSES</a></div>
    <div class="inner-div"><a class="clction-link" href="./denims.html">SHOP DENIMS</a></div>
    <div class="inner-div"><a class="clction-link" href="./watches.html">SHOP WATCHES</a></div>
    <div class="inner-div"><a class="clction-link" href="./sunglasses.html">SHOP SUNGLASSES</a></div>
</div>
</div>`;
}
}
customElements.define("my-menu", MyMenu);

class MyFooter extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML=`
        <style>
        .fa-instagram {
            background: #125688;
            color: white;
           
          }
          
          .fa-pinterest {
            background: #cb2027;
            color: white;
            
          }
          .fa-facebook {
            background: #3B5998;
          
            color: white;
          }
          .outer-footer {
              background-color: black;
              color: white;
              padding: 40px 0px;
          }
          
          .inner-footer {
              display: flex;
              width: 100%;
              flex-wrap: wrap;
          }
          
          .first {
              width: 25%;
              max-width: 150px;
              margin: 0 auto;
          }
          
          .second {
              width: 25%;
          }
          
          .third {
              width: 25%;
          }
          
          .forth {
              width: 25%;
          }
          
          .first img {
              max-width: 150px;
              margin: 0 auto;
          }
          
          
          
          .outer-footer ul li {
              list-style-type: none;
              padding: 2px 0;
          }
          
          .forth a.fa {
              font-size: 40px;
              margin-right: 10px;
              padding: 10px;
          }
          a.link {
              text-decoration:none;
              color:white;
          }
            
        </style>
        <div class="outer-footer">
                <div class="inner-footer">
                    <div class="first">
                        <img src="../media/fav-icon.png">
                    </div>
                    <div class="second">
                        <ul>
                            <li><a class="link" href="html\about.html">About us</a></li>
                            <li>Find our store</li>
                        </ul>
                    </div>
                    <div class="third">
                        <ul>
                            <li>Services</li>
                            <li>Recruitment</li>
                        </ul>
                    </div>
                    <div class="forth">
                        <a href="#" class="fa fa-instagram"></a>
<a href="#" class="fa fa-pinterest"></a>
<a href="#" class="fa fa-facebook"></a>
                    </div>
                </div>
            </div>`;
    }
}

customElements.define("my-footer", MyFooter);
