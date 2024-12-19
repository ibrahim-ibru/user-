
document.getElementById("login-form").addEventListener("submit",async(ev)=>{
    try {
        ev.preventDefault()
        console.log("here");
    const email=document.getElementById("login-email").value
    const password=document.getElementById("login-pass").value

    console.log(email,password);
    

    const res= await fetch("http://localhost:3000/api/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password})
    })
    console.log(res);

    if(res.status==200){
        const {msg,token}= await res.json()
        console.log(token);
        alert(msg)
        sessionStorage.setItem("token",token)
        window.location.href="../index.html"
    }
    else{
        const {msg}= await res.json()
        alert(msg)
    }


    } catch (error) {
        console.log(error);
        
    }
    
})

