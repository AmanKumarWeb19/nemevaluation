const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.routes");
const { postRouter } = require("./routes/Post.routes");
const { authenticate } = require("./Middlewares/authenticate.middleware");
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOMEPAGE");
});

app.use("/user", userRouter);
app.use(authenticate);
app.use("/note", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Didnot Connect to db");
  }
  console.log(`running at ${process.env.port}`);
});
