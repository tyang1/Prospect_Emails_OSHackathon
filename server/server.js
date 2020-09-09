const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

/**
 * root
 */
app.get("/images", (req, res) => {
  
    console.log("hitting the main route to get images")
  });


  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
  
  module.exports = app;