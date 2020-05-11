const nodemailer = require('nodemailer');

// NODEMAILER CONFIG
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_EMAIL_PASSWORD
    }
});

module.exports = transporter;