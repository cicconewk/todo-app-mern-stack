const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
require("./database");

//SETTINGS
app.set("port", process.env.PORT || 3000);

//MIDDLEWARES
app.use(morgan("dev")); //Muestra en consola las peticiones realizadas
app.use(express.json()); //Retorna en JSON los datos transferidos

//ROUTES
app.use("/api/tasks", require("./routes/task.routes"));

//STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

//SERVER
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
