const API="http://localhost:3000"
let profile;

document.getElementById("profile").addEventListener("change",async(e)=>{
    profile=await convertBase64(e.target.files[0])
    console.log(profile);
    
    
})

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
        body:JSON.stringify({username,email,password,cpassword,profile})
    })
    console.log(res);

    if(res.status==201){
        const {msg}= await res.json()
        alert(msg)
        window.location.href="../pages/login.html"
    }
    if(res.status==404){
        const {msg}= await res.json()
        alert(msg)
    }



    } catch (error) {
        console.log(error);
        
    }
    
})


function convertBase64(file) {
    return new Promise((res,rej)=>{
        const fileReader=new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload=()=>{
            res(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            rej(error)
        }
    })
}


async function checkDetails(uname,email,pass,cpass) {
    
}

