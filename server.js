const http = require('http');
const mongoose = require('mongoose');
const student = require('./models/student');
const port = 8080;
const app = require('./app');

const db = mongoose.connection;

const server = http.createServer(app);

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected with Database');
});

var newStudent = new student({
    id: 1,
    vorname: "Peter",
    nachname: "Parker",
    matrikelnummer: 11102233,
    studiengang: "MI",
    semester: 35,
    email: "iamnotspiderman@peterparker.de"
});

student.deleteMany({}, function(err){
    if (err) throw err;

});

newStudent.save(function (err) {
    if (err) throw err;

    console.log('User created!');
});

server.listen(port);

console.log("Server running at http://127.0.0.1:8080/");