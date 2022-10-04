const express = require("express");
const app = express();
const studentRouter = require('./routers/studentRouter');
const morgan = require('morgan');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter')


if(process.env.NODE_ENV==='production'){
  console.log('development server');
  app.use(morgan('dev'))
}



app.use(express.json());



app.use('/api/students',studentRouter);
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);







app.get("/", (req, res) => {
  console.log('I am middleware 3');
  res.send("Hello World");
});

module.exports = app;

