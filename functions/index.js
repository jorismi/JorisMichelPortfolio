'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

//to make it work you need gmail account
const gmailEmail = functions.config().gmail.login;
const gmailPassword =  functions.config().gmail.pass;
const gmailClientID = functions.config().gmail.client_id;
const gmailSecretID =  functions.config().gmail.secret_id;
const gmailRefreshToken = functions.config().gmail.refresh_token;
const gmailAccessToken =  functions.config().gmail.access_token;

admin.initializeApp();

//transporter is a way to send your emails
/*const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});*/

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: gmailEmail,
        clientId: gmailClientID,
        clientSecret: gmailSecretID,
        refreshToken: gmailRefreshToken,
        accessToken: gmailAccessToken,
        expires: 1484314697598
    }
});

//Creating a Firebase Cloud Function
exports.emailSender = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const mailOptions = {
            from: gmailEmail, 
            to: "jorismichel@hotmail.fr",
            subject: "Mail reçu depuis le portfolio!",
            html: "<p> Nom de l'expediteur : "+req.body.name+"</p>" + 
            "<p> Mail de l'expediteur : "+req.body.email+"</p>" + 
            "<p> Sujet de l'expediteur : "+req.body.subject+"</p>" + 
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