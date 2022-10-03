const express = require('express');
const router = express.Router();

const {Student} = require('../models/students');

//using named function

const studentList = async(req, res) => {
   const students = await Student.find().sort({name:-1})
   res.status(200).send(students)
};
  
  const newStudent = async(req, res) => {
    const student = new Student(req.body);
    try {
      const result = await student.save();
      res.status(200).send(result);

    } catch (error) {
       const errorMsgs = [];
       for(field in error.errors){
          errorMsgs.push(error.errors[field].message);
       }
       res.status(400).send(errorMsgs);
    }
  };
  
  const studentDetail = async(req, res) => {
     const id = req.params.id;
     try {
       const student = await Student.findById(id);
       if(!student) res.status(404).send('Not found')
       res.send(student)
     } catch (error) {
       res.status(404).send('Id not found!');
     }
  };
  
  const studentUpdate = async(req, res) => {
     const id = req.params.id;
     const updatedInfo = req.body;
     try {
        const student = await Student.findByIdAndUpdate(id,updatedInfo,{new:true});
        if(!student) res.status(404).send('Not found')
        res.send(student)
      
     } catch (error) {
        res.status(404).send('Id not found!');
     }
  };
  
  const studentDelete = async(req, res) => {
    const id = req.params.id;
     try {
       const student = await Student.findByIdAndDelete(id);
       if(!student) res.status(404).send('Not found')
       res.send(student)
     
    } catch (error) {
       res.status(404).send('Id not found!');
    }
  };
  
  
  
 router.route("/")
  .get(studentList)
  .post(newStudent)
  
 router.route("/:id")
  .get(studentDetail)
  .put(studentUpdate)
  .delete( studentDelete)


  module.exports = router;
  