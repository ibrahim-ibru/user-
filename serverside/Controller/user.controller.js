import userSchema from "../model/user.model.js"
import bcrypt from "bcrypt"

export async function addUser(req,res) {
    console.log(req.body);
    
    const {username,email,password,cpassword} =req.body
    console.log(username,email,password,cpassword);
    // check fiels are empty
    if(!(username&&email&&password&&cpassword))
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
        await userSchema.create({username,email,password:hpassword}).then(()=>{
                res.status(201).send({msg:"successfully created"})
            }).catch((error)=>{
                res.status(500).send(error)
            })  
      
}

