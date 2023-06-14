const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const mysql = require('mysql2');
const user = require("./routes/userRoutes");
const data = require("./routes/dataRoutes");

const app = express();

const MONGOURI = "mongodb://127.0.0.1:27017/mydatabase";

app.use(bodyParser.json());
app.use(cors())

app.use("/user", user);
app.use("/data", data);


mongoose.connect(MONGOURI)
.then(() => {
	console.log("Connected to DB");
	app.listen(3001, () => {
		console.log(`Node is running on port 3001`);
    });
  })
  .catch((error) => {
	console.log(error);
  });
