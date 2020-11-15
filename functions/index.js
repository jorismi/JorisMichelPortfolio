'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cors = require('cors')({ origin: true });

//to make it work you need gmail account
const gmailEmail = functions.config().gmail.login;
const gmailPassword = functions.config().gmail.pass;

admin.initializeApp();

//transporter is a way to send your emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

//Creating a Firebase Cloud Function
exports.emailSender = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const mailOptions = {
            from: "micheljoris31@gmail.com", 
            to: "jorismichel@hotmail.fr",
            subject: "Mail reçu depuis le portfolio ==> " + req.body.subject,
            html: "<p> Nom de l'expediteur : "+req.body.name+"</p>" + 
            "<p> Mail de l'expediteur : "+req.body.email+"</p>" + 
            "<p> Message de l'expediteur : "+req.body.message+"</p>"
        };

        return transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.send(err.toString());
            }
            return res.status('200').send('Email sent succesfully');
        });
    })
});