const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 7500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "public/assets"));

let count = 0;

//routes
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "./../../index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "./../../notes.html"));
  });
  
  app.get("/api/notes", function(req, res){
    return res.json(notes);
  });

//post
  app.post("/api/notes", function(req, res){
    if(notes === false)
    notes = [];
    let newNote = req.body;
    count++;
    let id = count;
    notes.push(newNote);
    toStringAndWrite(notes);
    res.join(notes);
  })

//deletes
  app.delete("/api/notes/:id", function(req, res){
    let id = req.params.id;
    for(let i = 0; i < notes.length; i++){
      if(notes[i].id== id){
        notes.splice(i, 1);
        res.json("deleted")
      }
    }
    if(notes[0] == null)
      fs.writeFileSync("db/db.json", "[]", "utf-8");
    else
    fs.writeFileSync("db/db.json", notes, "utf-8");
  });

//listens
  app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
  });