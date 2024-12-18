document.getElementById("reg-form").addEventListener("submit",async(ev)=>{
    try {
        ev.preventDefault()
    const username=document.getElementById("uname").value
    const email=document.getElementById("email").value
    const password=document.getElementById("pass").value
    const cpassword=document.getElementById("cpass").value

    console.log(username,email,password,cpassword);
    

    const res= await fetch("http://localhost:3000/api/adduser",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,email,password,cpassword})
    })
    console.log(res);

    if(res.status==201){
        const {msg}= await res.json()
        alert(msg)
        window.location.href="../pages/home.html"
    }


    } catch (error) {
        console.log(error);
        
    }
    
})

