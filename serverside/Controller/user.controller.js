import userSchema from "../model/user.model.js"
import bcrypt from "bcrypt"
import pkg from "jsonwebtoken"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "8aef8d55f99f68",
      pass: "19026f090c25f4",
    },
  });
  
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

export async function verifyEmail(req,res) {
    const code=`<div style="height: 40rem;border: 2px solid black;width: auto;width: 30rem;padding: 10px;margin: auto;">
        <header style="height: 150px;margin: auto;margin-bottom: 20px; width: 100%;color: aliceblue;text-align: center;align-content: center; background-color: black;">
            <h1>Verify Your Email</h1>
        </header>
        <div style="height: 60%; width: 95%;border: 1px solid black;border-radius: 5px;padding: 10px;">
            <h4>Hi User,</h4><br>
            <p>Your abc account is requested to reset the password if that's you then click verify button below and set your new password .If this isn't you then just ignore it. Have a nice day.</p>
            <a href="http://localhost:3000/pages/forgetpassword.html"><button style="height: 30px;width: 15rem; background-color: green;color: white;">Click Here To Set New Password</button></a>
        </div>
    </div>`
    try {
        console.log(req);
        
        console.log("here");
        console.log(req.body);
        const info = await transporter.sendMail({
            from: 'rihoba4697@ronete.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Verify Email", // Subject line
            text: "Verify your email and join with us", // plain text body
            html: code, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          res.status(200).send({msg:"Check your email"})
    } catch (er) {
        res.status(400).send({error:er})
    }
}