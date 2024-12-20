import userSchema from "../model/user.model.js"
import bcrypt from "bcrypt"
import pkg from "jsonwebtoken"
const { sign } =pkg

export async function addUser(req,res) {
    console.log(req.body);
    
    const {username,email,password,cpassword,profile} =req.body
    console.log(username,email,password,cpassword);
    // check fiels are empty
    if(!(username&&email&&password&&cpassword&&profile))
        return res.status(404).send({msg:"fields are empty"})
    // compare passwords
    if(password!==cpassword)
        return res.status(404).send({msg:"password doesn't match"})
    // check existance of email
    const data=await userSchema.findOne({email})
    if(data)
        return res.status(404).send({msg:"email already existed"})
    // convert password to hashed
    const hpassword=await bcrypt.hash(password,10)
    console.log(hpassword);

    // tech 1
    // _______
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(password, salt,async function(err, hash) {
    //         // Store hash in your password DB.
    //         console.log(hash);
    //         res.send("hai"+"=="+hash)
            
            
    //     });

    // });
    // tech2

    // bcrypt.hash(password, 10,async function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    //         res.send("hai"+"=="+hash)

        
    // });
        await userSchema.create({username,email,password:hpassword,profile}).then(()=>{
                res.status(201).send({msg:"successfully created"})
            }).catch((error)=>{
                res.status(500).send(error)
            })  
      
}


export async function loginUser(req,res){
    const {email,password}= req.body
    // check fiels are empty
    if(!(email&&password))
        return res.status(404).send({msg:"fields are empty"})

    const user= await userSchema.findOne({email})
    if(user==null)
        return res.status(404).send({msg:"email is not valid"})
    const success= await bcrypt.compare(password,user.password)
    console.log(success);
    if(!(success))
        return res.status(404).send({msg:"Incorrect password"})
    const token= sign({userID:user._id},process.env.JWT_TOKEN,{expiresIn:"1h"})
    res.status(200).send({msg:"Succesfully logged in",token})
}


export async function Home(req,res){
    // res.send("hai")
    try {
        console.log("end point");
        console.log(req.user);
        const _id=req.user.userID
        const user=await userSchema.findOne({_id})
        res.status(200).send({username:user.username,profile:user.profile})

    } catch (error) {
        res.status(400).send({error})
    }
}