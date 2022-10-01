const fs = require("fs");

const getDbStudents = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
      const students = JSON.parse(data);
      resolve(students);
    });
  });
};


const insertDbStudent = students =>{
    return new Promise((resolve,reject)=>{
      fs.writeFile('./db.json',JSON.stringify(students),err=>{
        resolve("successfully inserted");
      })  
    })
}

module.exports.getDbStudent = getDbStudents;
module.exports.insertDbStudents = insertDbStudents;