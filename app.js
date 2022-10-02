const express = require("express");
const app = express();
const studentRouter = require('./routers/studentRouter');
const morgan = require('morgan');

//buildin middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
//third party middleware
app.use(morgan('tiny'));



app.use('/api/students',studentRouter);

app.get("/", (req, res) => {
  console.log('I am middleware 3');
  res.send("Hello World");
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running...");
});


