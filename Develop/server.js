
var path = require('path');
var express = require('express');
var fs = require('fs');
const { join } = require('path');
var app = express();


var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/notes', function(rec,res){
    res.sendFile(path.join(__dirname,"/public/notes.html"));
})

app.get('/api/notes', function(rec,res){
    allNotes = fs.readFileSync('db/db.json','utf8');
    allNotes = JSON.parse(allNotes);
    res.json(allNotes);
})


app.post('/api/notes', function(rec,res){
    allNotes = fs.readFileSync('db/db.json','utf8');
    allNotes = JSON.parse(allNotes);
    rec.body.id = allNotes.length;
    allNotes.push(rec.body);
    fs.writeFileSync('db/db.json',JSON.stringify(allNotes));
    
    res.json(JSON.parse(allNotes));
})

app.delete('/api/notes/:id', function(rec,res){
    allNotes = fs.readFileSync('db/db.json','utf8');
    allNotes = JSON.parse(allNotes);
    allNotes = allNotes.filter(function(notes){
       return notes.id != rec.params.id
   })
    fs.writeFileSync('db/db.json',JSON.stringify(allNotes));
    
    res.json(JSON.parse(allNotes));
})

app.listen(PORT, function () {
  console.log('App listening on PORT: http://localhost:' + PORT);
});
