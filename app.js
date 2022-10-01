const exp = require("constants");
const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/students", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    console.log(typeof data); //string
    const students = JSON.parse(data).students;
    res.send(students);
  });
});

app.post("/api/students", (req, res) => {
  const student = req.body;
  fs.readFile("./db.json", "utf-8", (err, data) => {
    const students = JSON.parse(data);
    students.students.push(student);

    
    fs.writeFile("./db.json", JSON.stringify(students), (err) => {
      res.send("Posted");
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running...");
});
