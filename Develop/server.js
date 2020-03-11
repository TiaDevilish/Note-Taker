const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json")

const app = express();
const PORT = 7500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//routes
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname , "./public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname , "./public/notes.html"));
  });

  app.get("/api/notes", function(req, res){
    res.sendFile(path.join(__dirname,"/db/db.json"))
  });

  app.get("/api/notes/:id", function(req, res){
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
  });

//post
  app.post("/api/notes", function(req, res){
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueId = (savedNotes.length).toString();
    newNote.id = uniqueId;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db", newNote);
    res.json(savedNotes);
  });

//deletes
  app.delete("/api/notes/:id", function(req, res){
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleting note with id ${noteId}`);
    savedNotes = savedNotes.filter(currentNote => {
      return currentNote.id != noteId;
    })

    for(currentNote of savedNotes) {
      currentNote.id = newId.toString();
      newId++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
  });

//listens
  app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
  });