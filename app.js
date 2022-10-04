const express = require("express");
const app = express();
const studentRouter = require('./routers/studentRouter');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter')


mongoose.connect('mongodb://localhost:27017/my-students')
.then(()=>{
  console.log('Connected to mongodb');
})
.catch(err=>console.log(err))

app.use(express.json());



app.use('/api/students',studentRouter);
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);







app.get("/", (req, res) => {
  console.log('I am middleware 3');
  res.send("Hello World");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running...");
});


