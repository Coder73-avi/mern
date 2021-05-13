const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// for user schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[{
         name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        subject:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
    }],
    tokens:[
        {
        token:{
            type:String,
            required:true
            }
        }
    ]

});




// generating token
userSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this.id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log("token not generated.");
    }
}

userSchema.methods.addMessage = async function (name, email, subject, message) {
    try{
        this.messages = this.messages.concat({name, email, subject, message});
        await this.save();
        return this.messages;
    }catch(err){
        console.log(err)
    }
}


const User = mongoose.model('user', userSchema);

module.exports = User;

