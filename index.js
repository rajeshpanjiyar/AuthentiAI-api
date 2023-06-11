const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const mongoose = require("mongoose")
const request = require("request");
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

app.use(express.static(__dirname + "/public")); //for static files to load in server  //prerequisite: must have public folder with all those static files like images and css
app.use(bodyParser.urlencoded({extended: true})); // can use body parser to parse through html files
app.use(bodyParser.json());

require('dotenv').config()
require("./Db/db");

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use("/api", require("./Routes/routes"));

app.listen(port, () => {
  console.log(`Server is running at port: ${port} `);
});
