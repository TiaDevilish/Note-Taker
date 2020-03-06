const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 7500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "../../../index.html"));
    console.log(__dirname)
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "../../../notes.html"));
  });



//at end
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });