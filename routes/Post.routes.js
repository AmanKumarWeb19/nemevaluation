const express = require("express");
const { PostModel } = require("../model/post.model");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const notes = await PostModel.find();
    res.send(notes);
  } catch (err) {
    console.log(err);
    res.send("Something is wrong");
  }
});

postRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new PostModel(payload);
    await new_note.save();
    res.send("creating the note");
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await PostModel.findOne({ _id: id });
  const userID_Post = note.User_ID;
  const UserID_making_req = req.body.userID;
  try {
    if (UserID_making_req !== userID_Post) {
      res.send({ msg: "not authorized" });
    } else {
      await PostModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("update the note");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "something went wrong" });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const note = await PostModel.findOne({ _id: id });
  const userID_Post = note.User_ID;
  const UserID_making_req = req.body.userID;
  try {
    if (UserID_making_req !== userID_Post) {
      res.send({ msg: "not authorized" });
    } else {
      await PostModel.findByIdAndUpdate({ _id: id });
      res.send("update the note");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "something went wrong" });
  }
});

module.exports = {
  postRouter,
};
