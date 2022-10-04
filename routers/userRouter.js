const express = require("express");
const bcrypt = require('bcrypt');

const router = express.Router();

const { User } = require("../models/users");

const newUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) res.status(400).send("User already registered!");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);

  try {
    const result = await user.save();
    res.status(200).send({
        name:result.name,
        email:result.email
    });
  } catch (error) {
    const errorMsgs = [];
    for (field in error.errors) {
      errorMsgs.push(error.errors[field].message);
    }
    res.status(400).send(errorMsgs);
  }
};


router.route("/").post(newUser);

module.exports = router;
