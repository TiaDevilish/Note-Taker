const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const app = express();
const PORT = 7500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets"));

var note = [];

//routes
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "./../../index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "./../../notes.html"));
  });

//gets
  app.get("/api/notes", function(req, res){
    return res.json(note);
  });

  app.post("/api/notes", function(req, res){
    var newNote = req.body;
    newNote.id = uuid();
    note.push(newNote);
    res.json(newNote);
  });

//deletes
  app.delete("/api/notes/:id", function(req, res){
    for(i = 0; i < note.length; i++){
      if(req.params.id == note[i].id){
        note.splice(i,1)
      }
      res.json(req.body);
    }
  });

//listens
  app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
  });