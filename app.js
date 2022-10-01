const exp = require("constants");
const express = require("express");
const db = require("./db");


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/students", (req, res) => {
  db.getDbStudents().then((students) => {
    res.send(students);
  });
});

app.post("/api/students", (req, res) => {
  const student = req.body;

  db.getDbStudents().then((students) => {
    students.push(student);
      db.insertDbStudent(students)
      .then(data =>{
         res.send(data)
      })
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running...");
});
