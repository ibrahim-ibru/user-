
async function getUser(){
    try {
        const token=sessionStorage.getItem("token")
        console.log(token);
        const res=await fetch("http://localhost:3000/api/home",{
            method:"GET",
            headers:{"authorization":`Bearer ${token}`}
        })
        if(res.status==200){
            const {username}=await res.json()
            console.log(username)
            document.getElementById("usname").textContent=username
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