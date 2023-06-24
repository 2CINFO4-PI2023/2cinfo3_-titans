import "dotenv/config";

import { Twilio } from "twilio";


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;


export class SendTwilioSMS

{
    async createMessage(message: string , to : string) {

        if (accountSid && authToken  && twilioNumber) {
            const client = new Twilio(accountSid, authToken);
          
            client.messages
              .create({
                from: twilioNumber,
                to: to,
                body: message,
              })
              .then((message) => console.log(message.sid));
          } else {
            console.error(
              " missing one of the variables  !!!!!!"
            );
          }



    }

}