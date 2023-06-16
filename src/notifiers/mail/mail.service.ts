import nodemailer, { Transporter } from 'nodemailer';
import smtpPool from 'nodemailer-smtp-pool';

export interface IMailNotifier {
  sendMail(to: string, content: string): void;
}
export class Mailer implements IMailNotifier {
  async sendMail(to: string, content: string) {
 
    let transporter:Transporter = nodemailer.createTransport(smtpPool({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_TLS === 'yes' ? true : false,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      }));

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"pureplate" <mohamed.sallamirhouma@esprit.tn>', 
      to, 
      subject: "confirmation", 
      html: content,
    });
  }
}
