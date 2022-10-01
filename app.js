const exp = require("constants");
const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//using named function
const studentList = (req, res) => {
  db.getDbStudents().then((students) => {
    res.send(students);
  });
};

const newStudent = (req, res) => {
  const student = req.body;
  db.getDbStudents().then((students) => {
    students.push(student);
    db.insertDbStudent(students).then((data) => {
      res.send(data);
    });
  });
};

const studentDetail = (req, res) => {
  const id = parseInt(req.params.id);
  db.getDbStudents().then((students) => {
    const student = students.find((s) => s.id === id);
    if (!student) res.status(404).send("No student found with this id");
    else res.send(student);
  });
};

const studentUpdate = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedInfo = req.body;
  db.getDbStudents().then((students) => {
    const student = students.find((s) => s.id === id);
    if (!student) res.status(404).send("No student found with this id");
    else {
      const i = students.findIndex((s) => s.id === id);
      console.log("i", i);
      students[i] = updatedInfo;
      db.insertDbStudent(students).then((msg) => {
        res.send(msg);
      });
    }
  });
};

const studentDelete = (req, res) => {
  const id = parseInt(req.params.id);

  db.getDbStudents().then((students) => {
    const student = students.find((s) => s.id === id);
    if (!student) res.status(404).send("No student found with this id");

    const updatedStudents = students.filter((s) => s.id !== id);

    db.insertDbStudent(updatedStudents).then((msg) => {
      res.send(student);
    });
  });
};

app.get("/api/students", studentList);
app.post("/api/students", newStudent);
app.get("/api/students/:id", studentDetail);
app.put("/api/students/:id", studentUpdate);
app.delete("/api/students/:id", studentDelete);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running...");
});
