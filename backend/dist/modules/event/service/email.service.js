"use strict";
/* import { IEvent } from "../model/event.schema";
import { IInscription } from "../model/inscription.schema";
import nodemailer from "nodemailer";
declare module 'nodemailer';


export interface IEmailService {
  sendConfirmationEmail(recipient: string, event: IEvent, inscription: IInscription): Promise<void>;
  sendApologyEmail(recipient: string, event: IEvent): Promise<void>;
}

export class EmailService implements IEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize the nodemailer transporter
    this.transporter = nodemailer.createTransport({
      // Configure the email service or SMTP details here
    });
  }

  async sendConfirmationEmail(recipient: string, event: IEvent, inscription: IInscription): Promise<void> {
    try {
      const subject = "Event Confirmation";
      const html = this.buildConfirmationEmail(event, inscription);

      await this.transporter.sendMail({
        from: "your-email@example.com", // Set the sender email address
        to: recipient,
        subject,
        html,
      });
    } catch (error) {
      // Handle error sending the email
      throw new Error("Failed to send confirmation email.");
    }
  }

  async sendApologyEmail(recipient: string, event: IEvent): Promise<void> {
    try {
      const subject = "Apology for Event Capacity";
      const html = this.buildApologyEmail(event);

      await this.transporter.sendMail({
        from: "your-email@example.com", // Set the sender email address
        to: recipient,
        subject,
        html,
      });
    } catch (error) {
      // Handle error sending the email
      throw new Error("Failed to send apology email.");
    }
  }

  private buildConfirmationEmail(event: IEvent, inscription: IInscription): string {
    // Load the confirmation email template from file or a template engine
    // Replace the placeholders in the template with the dynamic information (event details, inscription details)
    // Return the HTML content of the customized email

    // Example implementation using the provided HTML template file:
    const confirmationTemplate = fs.readFileSync("src/email-templates/confirmation.html", "utf-8");
    const recipientName = inscription.name;
    const eventName = event.name;
    const eventDate = event.date.toISOString();

    const html = confirmationTemplate
      .replace("[Recipient]", recipientName)
      .replace("[Event Name]", eventName)
      .replace("[Event Date]", eventDate);

    return html;
  }

  private buildApologyEmail(event: IEvent): string {
    // Load the apology email template from file or a template engine
    // Replace the placeholders in the template with the dynamic information (event details)
    // Return the HTML content of the customized email

    // Example implementation using the provided HTML template file:
    const apologyTemplate = fs.readFileSync("src/email-templates/apology.html", "utf-8");
    const recipientName = "John Doe"; // Replace with the recipient's name
    const eventName = event.name;

    const html = apologyTemplate
      .replace("[Recipient]", recipientName)
      .replace("[Event Name]", eventName);

    return html;
  }
}
*/ 
