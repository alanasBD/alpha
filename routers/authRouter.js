const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");


const authUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) res.status(404).send("Invalid email or password");

  const validUser = await bcrypt.compare(req.body.password, user.password);

  if (!validUser) res.status(400).send("Invalid email or password");

  // const token = jwt.sign({ _id: user._id,email: user.email,},process.env.mySecretKey);
  const token = user.generateJWT()

  res.send({token});
};

router.route("/").post(authUser);

module.exports = router;
