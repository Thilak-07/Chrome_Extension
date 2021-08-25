const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const port = 3000;
const app = express();
app.use(express.json());

const corsOptions = {
    origin:'chrome-extension://nmcjdbokjihchnjjonhddfcelncobgle', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.post('/', (req, res) => {
    console.log("Got Post request.")
    var clip = req.body.clip;

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'clipboardmail07@gmail.com',
            pass: 'mailpswd'
        }
    });

    let mailDetails = {
        from: 'clipboardmail07@gmail.com',
        to: 'yourmail@gmail.com',
        subject: 'Mail From chrome Extension.',
        text: clip
    };

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})


