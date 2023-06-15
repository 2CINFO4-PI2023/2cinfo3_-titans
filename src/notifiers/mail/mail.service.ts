export interface IMailNotifier {
    sendMail(to:string,content:string):void
}
export class Mailer implements IMailNotifier {
    sendMail(to:string,content:string):void{
        console.log("email sent")
    }
}