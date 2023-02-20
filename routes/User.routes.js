const express = require("express");
const { UserModel } = require("../model/User.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          gender,
          password: secure_password,
          age,
          city,
        });
        await user.save();
        res.send({ msg: "reegistered" });
      }
    });
  } catch (err) {
    res.send({ msg: "problem in registering" });
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await UserModel.find({ email });
    const hashed_password = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ msg: "Login SuccessFul", token: token });
        } else {
          res.send({ msg: "Wrong Credential" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credential" });
    }
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

module.exports = {
  userRouter,
};
