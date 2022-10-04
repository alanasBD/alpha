const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path:'./config.env'})
const app = require('./app');
//config.env file ke akane include kora holo




mongoose.connect('mongodb://localhost:27017/my-students')
.then(()=>{
  console.log('Connected to mongodb');
})
.catch(err=>console.log(err))



const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running...");
});
