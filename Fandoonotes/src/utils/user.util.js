const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const CLIENT_ID = '909304783122-gk0eo6vpg0kdppv0c147tlo2bpf8qtma.apps.googleusercontent.com';

const CLIENT_SECRET = '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';

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04dTKg4VHNIyWCgYIARAAGAQSNwF-L9IrxVRj6Z8KQ4pvEqMuaeMMX3Fd1zNLc7ffjPFdFSYcPYIFzPqnB7H-NrmcPUIgLcNMprQ';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})

export async function sendMail(email,token){

  console.log("email--------->",email)

    try{
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type:'OAUTH2',
                user:'prasannalakshmikathi@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        //console.log(Object.assign({}, mailOptions));

        const mailOptions = {
            from: 'PRASANNALAKSHMIKATHI  <prasannalakshmikathi@gmail.com',
            to: email,
            subject: 'Hello from gmail using API',
            text:'Hello from gmail using API',
            html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:3000/${token}">click here</a></h1>`,
            
        };

        const result = await transport.sendMail(mailOptions)
        console.log("result---------->", result)
        return result;
       // return token;

    }catch(error){
        return error
    }
}
//sendMail()
   // .then((result)=> console.log('Email sent...',result))
   // .catch((error) => console.log(error.message));