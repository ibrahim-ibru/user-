const API="http://localhost:3000"

async function getUser(){
    try {
        const token=sessionStorage.getItem("token")
        console.log(token);
        const res=await fetch("http://localhost:3000/api/home",{
            method:"GET",
            headers:{"authorization":`Bearer ${token}`}
        })
        if(res.status==200){
            const {username,profile}=await res.json()
            console.log(username)
            document.getElementById("usname").textContent=username
            document.getElementById("proflog").style.display="none"
            document.getElementById("imgleft").src=profile
        }
        else{
            const {msg}= await res.json()
        alert(msg)
        window.location.href="../pages/login.html"
        }
    } catch (error) {
        alert(error)
    }
}
getUser()