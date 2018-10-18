var mongoose = require("mongoose");
var studentSchema = mongoose.Schema;

studentSchema = new studentSchema({

    id: Number,
    vorname: String,
    nachname: String,
    matrikelnummer: Number,
    studiengang : String,
    semester: Number,
    email : String

});

var student = mongoose.model('student', studentSchema);

module.exports = student;