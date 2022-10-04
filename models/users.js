const {Schema,model} = require('mongoose');


const User = model('User',Schema({
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
}));



module.exports.User = User;