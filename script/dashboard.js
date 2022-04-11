
let user = window.sessionStorage.getItem('user')
function LOAD() {
    console.log(user)
    if (user != null) {
        document.getElementById('wish').innerHTML = "Welcome " + user 
    }
    else
        document.getElementById('wish').innerHTML = "Unauthorised user"
}
function logout()
{ 
    alert("Logout")
    window.localStorage.clear()
    window.sessionStorage.clear()
    window.close()
}
LOAD()
