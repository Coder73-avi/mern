const express = require("express");
const router = express.Router();
require('../db/conn');
const User = require('../models/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticante = require('../middleware/authenticate');
// routing
router.get("/",(req, res)=>{
    res.status(400).send("Hello  router");
});

router.post('/register',async (req, res)=>{
    const {name, email, phone, work, password, cpassword} = req.body;
    // console.log(name);
    // res.json({message: req.body});

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"Plz filled the required fill."});
    }else{
        try {
            const respose = await User.findOne({email});
            if(respose){
                return res.status(422).json({error:"Email already exist"});
            }else{
                if(password !== cpassword){
                        res.status(401).json({error:"Password or confirm password does not match."});
                }else{
                    const hashPwd = await bcrypt.hash(password, 10);
                    const user = new User({name, email, phone, work, password:hashPwd, cpassword});
                    

                    
                    await user.save() ? res.status(201).json({success:"Insert sucessfully."}) : false;
                    // console.log(user);
                }
            }


        } catch (err) {
            console.log(err);            
        }

        
    }
    

});


router.post('/signin', async (req, res)=>{

    const {email, password} = req.body;
    if(!email || !password){
        res.status(422).json({error:"Fill the empty filed"}) ;
    }else{
        const match = await User.findOne({email});

        if(!match){
            res.status(422).json({error:"Incorrect email or password"});
        }else{

                const matchPwd = await bcrypt.compare(password, match.password);
                const token = await match.generateAuthToken();

                // console.log(token);
                res.cookie('jwtoken', token,{
                    expires: new Date(Date.now + 25892000),
                    httpOnly:true
                });

                if(matchPwd==true){
                    res.json({success:"Sign in Sucessfully."});
                }else{
                    res.status(422).json({error:"Email or password doesnot match"});
                }
        }
    }
});

// about us page

router.get('/about', authenticante, (req, res)=>{
    console.log(`Hello from my About`);
    res.status(200).send(req.rootUser);
})

router.get('/getdata', authenticante, (req, res)=>{
    console.log("hello from getdata");
    res.status(200).send(req.rootUser);
})

router.post('/contact', authenticante, async(req, res) =>{
    console.log("Hello from contact");   
    try {
        const {name, email, subject, message} = req.body;
        if(!name || !email || !subject || !message){
            return res.status(422).json({error:"Plzz filled the contact form " + message});
        }else{
            const userContact = await User.findOne({_id: req.userID});

            if(userContact){
                const userMessage = await userContact.addMessage(name, email, subject, message);
                await userContact.save();
                res.status(201).json({success:"Message send successfully"});
            }
        }

    } catch (error) {
        consol.log(error);
    }
})

router.get('/logout',authenticante, async(req, res)=>{
    // console.log(req.rootUser);
  try{
    req.rootUser.tokens = req.rootUser.tokens.filter((currElement)=>{
         return currElement.token !=req.token
    });
    res.clearCookie('jwtoken',{path:'/'});
    await req.rootUser.save();
    res.status(200).json({});
    console.log("Log out successfully");

}catch(err){
    res.status(422).json({error:"Sorry logout failed."});
}
})


router.patch('/update/:id', async(req, res)=>{
    // const {name, email, phone, work, password} = req.body;
    const cpassword = req.body.password;
    const _id = req.params.id; 

    const userUpdate = await User.findByIdAndUpdate(_id,req.body);
    // console.log(req);
    if(userUpdate){
        res.status(200).json({success:"Update successfully"});
    }else{
        res.status(401).json({error:"Updatae failed for some reason check properly."});
    }
    


})


module.exports = router;
