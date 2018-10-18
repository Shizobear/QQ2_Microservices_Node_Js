const express = require("express");
const router = express.Router();
const student = require('../models/student');
const mongoose = require('mongoose');
const kafka = require('kafka-node');

let Producer = kafka.Producer;
let client = new kafka.KafkaClient({ kafkaHost: 'qq2.ddnss.de:9092' });
let producer = new Producer(client);

let studentID = 2;

let payload2 = {
    "topic": "logging",
    "message": '{"service_name": "1_NodeJs_2", "operation": "GET", "message": "Alle Studenten"}'
};

let message123;



router.get("/", function (req, res) {

    message123 = '{"service_name": "1_NodeJs_2", "operation": "GET", "message": "Alle Studenten"}';
    triggerMe(message123);
    
    
    student.find({}, function (err, users) {
     if (err) throw err;

    }).then(function (doc) {
    console.log(doc);
     res.status(200).json(doc);
    });



});

router.get("/:id", function (req, res) {


    const id = req.params.id;

    message123 = '{"service_name": "1_NodeJs_2", "operation": "GET/ID", "message": "Ein Student mit ID"}';
    triggerMe(message123);

    student.find({ id: id })
        .then(function (doc) {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ error: err })
        });

});

router.post("/", function (req, res) {

    req.body.id = studentID++;

    message123 = '{"service_name": "1_NodeJs_2", "operation": "POST", "message": "Ein Student wird erstellt"}';
    triggerMe(message123);

    const newStudent = new student({
        id: req.body.id,
        vorname: req.body.firstname,
        nachname: req.body.lastname,
        matrikelnummer: req.body.matriculation_number,
        studiengang: req.body.course,
        semester: req.body.semester,
        email: req.body.email
    });

    newStudent.save(function (err) {
        if (err) throw err;
        console.log('User created!');
    });

    res.status(201).json({
        message: 'post good!',
        student: student
    });

});

router.patch("/:id", function (req, res) {

    const id = req.params.id;

    message123 = '{"service_name": "1_NodeJs_2", "operation": "PATCH", "message": "Ein Student wurde veraendert"}';
    triggerMe(message123);

    student.findOneAndUpdate({ id: id }, { vorname: req.body.firstname, nachname: req.body.lastname, matrikelnummer: req.body.matriculation_number, studiengang: req.body.course, semester: req.body.semester, email: req.body.email })
        .then(function (doc) {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ error: err })
        });

});

router.delete("/:id", function (req, res) {

    const id = req.params.id;

    message123 = '{"service_name": "1_NodeJs_2", "operation": "DELETE", "message": "Ein Student wurde geloescht"}';
    triggerMe(message123);
    student.deleteOne({ id: id })
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ error: err })
        });


});

function triggerMe(message123){
    producer.send([{ topic: 'logging', messages: message123 }], function (err, result) {
        console.log(err);
        console.log(result);
    });
};

module.exports = router;

