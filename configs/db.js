const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.eval_url);

module.exports = {
  connection,
};
