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

//post
app.get("/api/notes", function(req, res){
  return res.json(db);
 });

app.post("/api/notes", function(req, res){
  var newNote = req.body;
  db.push(newNote);
  const dbId = db.map(function(val, index){
    val.id = index + 1;
    return val;
  })
  fs.writeFile(path.join(__dirname, "./db/db.json"), notesJson, function(err){
    if (err) return console.log(err);
  })
  res.json(newNote);
});

let notesJson = JSON.stringify(db);


//deletes
app.delete("/api/notes/:id", function(req, res){
  
})



//listens
  app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
  });