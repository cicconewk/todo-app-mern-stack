const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/mern-task";

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.log("DB Connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
