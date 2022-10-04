const {Schema,model} = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = Schema({
    name:{
         type:String,
         required:true,
         minLength:5,
         maxLength:100
     },
     email:{
         type:String,
         required:true,
         minLength:5,
         maxLength:20,
         unique:true
 
     },
     password:{
         type:String,
         minLength:5,
         maxLength:1024
     }
 })

 userSchema.methods.generateJWT = function(){
    const token = jwt.sign({ _id: this._id,email: this.email,},process.env.mySecretKey);
    return token;
 }

const User = model('User',userSchema);



module.exports.User = User;