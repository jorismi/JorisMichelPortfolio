'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

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
    //Defining mailOptions
    const mailOptions = {
        from: gmailEmail, //Adding sender's email
        to: 'jorismichel@hotmail.fr', //Getting recipient's email by query string
        subject: 'Email Sent via Firebase', //Email subject
        html: '<b>Sending emails with Firebase is easy!</b>' //Email content in HTML
    };

    //Returning result
    return transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.send(err.toString());
        }
        return res.send('Email sent succesfully');
    });
});
