const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 7500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var note = [];

//routes
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname , "./public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname , "./public/notes.html"));
  });

//post
app.get("/api/notes", function(req, res){
  return res.json(note);
 });

app.post("/api/notes", function(req, res){
  var newNote = req.body;
  note.push(newNote);
  res.json(newNote);
});

//deletes

//listens
  app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
  });