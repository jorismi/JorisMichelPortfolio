'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cors = require('cors')({ origin: true });

//to make it work you need gmail account
//const gmailEmail = functions.config().gmail.login;
//const gmailPassword = functions.config().gmail.pass;

admin.initializeApp();

//transporter is a way to send your emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "micheljoris31@gmail.com",
        pass: "Iiossoma31!"
    }
});

//Creating a Firebase Cloud Function
exports.emailSender = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        //res.status(200).send("<!doctype html><head><title>Time</title> </head><body> "+  req.body +"</body></html>");
        //Defining mailOptions
        const mailOptions = {
            from: "micheljoris31@gmail.com", //Adding sender's email
            to: "jorismichel@hotmail.fr", //Getting recipient's email by query string
            subject: "Mail reçu depuis le portfolio ==> " + req.body.subject, //Email subject
            html: "<p> Nom de l'expediteur : "+req.body.name+"</p>" + 
            "<p> Mail de l'expediteur : "+req.body.email+"</p>" + 
            "<p> Message de l'expediteur : "+req.body.message+"</p>"
        };

        //Returning result
        return transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.send(err.toString());
            }
            return res.status('200').send('Email sent succesfully');
        });
    })
});

/*export const sendMail = async contactMeFormData => {
    try {
        const res = await axios.post("http://localhost:5001/jorismichelportfolio/us-central1/emailSender", contactMeFormData);
        const sendedMail = res.data;

        console.log("Sended a new mail!", sendedMail);

        return sendedMail;
    } catch (e) {
        console.error(e);
    }
};*/