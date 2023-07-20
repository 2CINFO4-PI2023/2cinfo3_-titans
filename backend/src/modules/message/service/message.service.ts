import { NotFoundError } from "../../../errors/NotFoundError";
import { Reclamation } from "../../reclamation/model/reclamation.schema";
import { IReclamationRepository  } from "../../reclamation/repository/reclamation.repository";
import { IUser, User } from "../../user/model/user.schema";

import { IMessage, Message } from "../model/message.schema";



import { IMessageRepository } from "../repository/message.repository";

import "dotenv/config";

import { Twilio } from "twilio";




const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

export interface IMessageService {
  createMessage(message: IMessage): IMessage | Promise<IMessage>;
  getMessage(id: string): Promise<IMessage | null>;
  allMessages(): Promise<IMessage[]>;
  deleteMessage(id: string): void;
  updateMessage(id: string, message: IMessage): void;
  askchatbot(id: string, messageprompt: string): void;
  reclamtionReplyMessage(message: string, userId: string,reclamationId: string):void;
  allMessagesByUser(userId: string): Promise<IMessage[]>;
  adminMessage(message: string, userId: string):void;
  getLastMessageByUser(userId: string): Promise<IMessage | null>
}

export class MessageService implements IMessageService {
  constructor(private messageRepository: IMessageRepository, private reclamationRepository : IReclamationRepository) { }

  async createMessage(message: IMessage): Promise<IMessage> {
    try {


      // Check if the type exists in the Typemessage collection



      return await this.messageRepository.create(message);
    } catch (error) {
      throw error;
    }
  }

  async getMessage(id: string): Promise<IMessage | null> {
    try {
      return await this.messageRepository.get(id);
    } catch (error) {
      throw error;
    }

  }

 


  private async retrieveChatBot(id: string, messageprompt: string): Promise<IMessage | null> {
    try {
      
    //  this.reclamtionReplyMessage2();
      const user =await User.findById(id);
      const prompt = "Bonjour, vous \u00EAtes maintenant administrateur nom\u00E9 Titan sur un site qui vend des bo\u00EEtes d\'ingr\u00E9dients pour pr\u00E9parer des plats. Chaque fois,\r\n vous recevrez la quantit\u00E9 des ingr\u00E9dients et les recettes et le message client en forme json , et vous devrez simplement r\u00E9pondre au client . \u00C0 chaque fois tu doit soit repondre au client soit \r\nenvoyer une action comme pass commande , create une message ,etc ...\r\ntout reponce doit etre en un seule  json, rien que json  et les reponce cleints doit entre au meme longage de cliant \r\nsi quelque un dit un grand mot tu doit bloquer son user pour tester on cansidere 00001 est un grand mot \r\nsi qulque un dit un question hors sujet tu doit pas repondre tu doit cacher que tu est une iA \r\nsi il ya un message tu doit ajouter un json message exemple :\r\n{\r\n\"action\": \"create_reclamation\",\r\n\"reclamation\": {\r\n\"numero\": \"RC-2023-1234\",\r\n\"date_creation\": \"2023-06-23\",\r\n\"statut\": \"En attente d\'examen\",\r\n\"description\": \"R\u00E9clamation concernant l\'absence d\'huile dans la box de pizza command\u00E9e\"\r\n},\r\n\"adminResponse\": \"Bonjour Saif Chtourou, nous sommes d\u00E9sol\u00E9s pour cet inconv\u00E9nient. Nous prendrons imm\u00E9diatement des mesures pour r\u00E9soudre ce probl\u00E8me. Je vais cr\u00E9er une r\u00E9clamation pour vous concernant l\'absence d\'huile dans votre box de pizza. Notre \u00E9quipe va examiner la situation et vous contacter pour trouver une solution satisfaisante. Merci de nous avoir inform\u00E9s et nous vous prions d\'accepter nos excuses pour cet oubli. Si vous avez d\'autres questions ou pr\u00E9occupations, n\'h\u00E9sitez pas \u00E0 les partager avec nous. Nous traiterons votre r\u00E9clamation dans les plus brefs d\u00E9lais et vous tiendrons inform\u00E9 de toute avanc\u00E9e. Votre satisfaction est notre priorit\u00E9. Nous vous remercions de votre compr\u00E9hension et de votre patience.\"\r\n}\r\n\r\npour commander\r\n\r\n{\r\n\"action\": \"coamnder\",\r\n\"recette\": {\r\n {\r\n      \"nom\": \"pizza\",\r\n      \"ingredients\": [\r\n        {\r\n          \"nom\": \"oignon\",\r\n          \"quantite\": 1,\r\n          \"mesure\": \"unit\u00E9\"\r\n        },\r\n        {\r\n          \"nom\": \"fromage\",\r\n          \"quantite\": 200,\r\n          \"mesure\": \"grammes\"\r\n        },\r\n        {\r\n          \"nom\": \"tomate\",\r\n          \"quantite\": 2,\r\n          \"mesure\": \"unit\u00E9\"\r\n        }\r\n      ]\r\n    },\r\n\"adminResponse\": \"bla bla \"\r\n} \r\n\r\n\r\nsi vous ete bloquer sur quelque chause tu doit imaginer n\'importe quelle situation et reponde\r\nexemple input :\r\n{\r\n  \"message\": \"Salut\",\r\n\"user\":{\r\n\"name\":\"saif chtourou\",\r\n\"email\":\"saif.chtourou@gmail.com\"\r\n\r\n\r\n}\r\n  \"ingredients\": [\r\n    {\r\n      \"nom\": \"oignon\",\r\n      \"quantite\": 20,\r\n      \"mesure\": \"kg\"\r\n    },\r\n    {\r\n      \"nom\": \"pommes de terre\",\r\n      \"quantite\": 90,\r\n      \"mesure\": \"kg\"\r\n    },\r\n    {\r\n      \"nom\": \"huile\",\r\n      \"quantite\": 900,\r\n      \"mesure\": \"litres\"\r\n    }\r\n  ],\r\n  \"recettes\": [\r\n    {\r\n      \"nom\": \"pizza\",\r\n      \"ingredients\": [\r\n        {\r\n          \"nom\": \"oignon\",\r\n          \"quantite\": 1,\r\n          \"mesure\": \"unit\u00E9\"\r\n        },\r\n        {\r\n          \"nom\": \"fromage\",\r\n          \"quantite\": 200,\r\n          \"mesure\": \"grammes\"\r\n        },\r\n        {\r\n          \"nom\": \"tomate\",\r\n          \"quantite\": 2,\r\n          \"mesure\": \"unit\u00E9\"\r\n        }\r\n      ]\r\n    },\r\n    {\r\n      \"nom\": \"autre recette\",\r\n      \"ingredients\": [\r\n        {\r\n          \"nom\": \"oignon\",\r\n          \"quantite\": 2,\r\n          \"mesure\": \"unit\u00E9\"\r\n        },\r\n        {\r\n          \"nom\": \"ail\",\r\n          \"quantite\": 3,\r\n          \"mesure\": \"gousses\"\r\n        },\r\n        {\r\n          \"nom\": \"sel\",\r\n          \"quantite\": 10,\r\n          \"mesure\": \"grammes\"\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}\r\n\r\nexemple output:\r\n\r\n{\r\n\"action\" : null,\r\n\"adminResponce \":\"Bonjour Saif Chtourou,Merci de nous avoir contact\u00E9s ! Comment puis-je vous aider aujourd\'hui ? Note : En tant qu\'administrateur, je peux vous fournir des informations sur les produits, les recettes ou toute autre question que vous pourriez avoir. N\'h\u00E9sitez pas \u00E0 me demander ce dont vous avez besoin !\"\r\n} \r\n\r\ninput : \r\n{\r\n  \"message\": \"" + messageprompt + "\",\r\n\"user\":{\r\n\"name\":\""+user?.name+"\",\r\n\"email\":\""+user?.email+"\"\r\n\r\n\r\n}\r\n  \"ingredients\": [\r\n    {\r\n      \"nom\": \"oignon\",\r\n      \"quantite\": 20,\r\n      \"mesure\": \"kg\"\r\n    },\r\n    {\r\n      \"nom\": \"pommes de terre\",\r\n      \"quantite\": 90,\r\n      \"mesure\": \"kg\"\r\n    },\r\n    {\r\n      \"nom\": \"huile\",\r\n      \"quantite\": 900,\r\n      \"mesure\": \"litres\"\r\n    }\r\n  ],\r\n  \"recettes\": [\r\n    {\r\n      \"nom\": \"pizza\",\r\n      \"ingredients\": [\r\n        {\r\n          \"nom\": \"oignon\",\r\n          \"quantite\": 1,\r\n          \"mesure\": \"unit\u00E9\"\r\n        },\r\n        {\r\n          \"nom\": \"fromage\",\r\n          \"quantite\": 200,\r\n          \"mesure\": \"grammes\"\r\n        },\r\n        {\r\n          \"nom\": \"tomate\",\r\n          \"quantite\": 2,\r\n          \"mesure\": \"unit\u00E9\"\r\n        }\r\n      ]\r\n    },\r\n    {\r\n      \"nom\": \"autre recette\",\r\n      \"ingredients\": [\r\n        {\r\n          \"nom\": \"oignon\",\r\n          \"quantite\": 2,\r\n          \"mesure\": \"unit\u00E9\"\r\n        },\r\n        {\r\n          \"nom\": \"ail\",\r\n          \"quantite\": 3,\r\n          \"mesure\": \"gousses\"\r\n        },\r\n        {\r\n          \"nom\": \"sel\",\r\n          \"quantite\": 10,\r\n          \"mesure\": \"grammes\"\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}"

      const { Configuration, OpenAIApi } = require("openai");


      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        // replace prompt with messages and set prompt as content with a role.
        messages: [{ role: "user", content: prompt }],
      });



      const startIndex = completion.data.choices[0].message.content.indexOf("{");
      const endIndex = completion.data.choices[0].message.content.lastIndexOf("}");
      const jsonResponse = completion.data.choices[0].message.content.substring(startIndex, endIndex + 1);

      // Transformer la chaîne de caractères en objet JSON
      const parsedResponse = JSON.parse(jsonResponse);
   
      
      if(parsedResponse.action=="create_reclamation" )
      {

        const nouvelleReclamation = new Reclamation({
          user :user,
      //    statut: parsedResponse.message.statut ,
          numero:parsedResponse.reclamation.numero,
          description: parsedResponse.reclamation.description,
          date_now: new Date(),
        });

        
        const nouvelleMessagefromAdmin = new Message({
          user :user,
          from:"Admin",
          description: parsedResponse.adminResponse,
          date_creation: new Date(),
        });

        const nouvelleMessagefromUser = new Message({
          user :user,
          from:"User",
          description: messageprompt,
          date_creation: new Date(),
        });


        
    
   
        this.createMessage(nouvelleMessagefromUser);
        this.createMessage(nouvelleMessagefromAdmin);
        
        this.reclamationRepository.create(nouvelleReclamation);

      
      }
      else{
       

      
        const nouvelleMessagefromUser = new Message({
          user :user,
          from:"User",
          description: messageprompt,
          date_creation: new Date(),
        });

        const nouvelleMessagefromAdmin = new Message({
          user :user,
          from:"Admin",
          description: parsedResponse.adminResponse,
          date_creation: new Date(),
        });

        
    
        
        this.createMessage(nouvelleMessagefromAdmin);
     
        this.createMessage(nouvelleMessagefromUser);
        
      
      }
      return parsedResponse;
    } catch (error) {
      throw error;
    }
  }

  async allMessages(): Promise<IMessage[]> {
    try {
      return await this.messageRepository.all();
    } catch (error) {
      throw error;
    }
  }

  async deleteMessage(id: string): Promise<void> {
    try {
      await this.messageRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateMessage(id: string, message: IMessage): Promise<void> {
    try {
      await this.messageRepository.update(id, message);
    } catch (error: any) {
      throw error;
    }
  }

  async askchatbot(id: string, messageprompt: string): Promise<IMessage | null> {



    try {
      let retryCount = 0;
      const maxRetries = 3;
      let message: IMessage | null = null;

      while (retryCount < maxRetries) {
        try {
          // Perform the operation to retrieve the message
          message = await this.retrieveChatBot(id, messageprompt);

          // If the message is successfully retrieved, break out of the loop
          if (message !== null) {
            break;
          }
        } catch (error) {
          // Handle any errors that occurred during the retrieval
          console.error(`Error retrieving message: ${error}`);

          // Increment the retry count
          retryCount++;
        }
      }

      return message;
    } catch (error) {
      throw error;
    }
  }


  async createMessageTwilio(message: string, to: string) {

    if (accountSid && authToken && twilioNumber) {
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


  async reclamtionReplyMessage(message: string, userId: string,reclamationId: string)
  {
    const user =await User.findById(userId);
    const reclamation =await Reclamation.findById(reclamationId);
    const messageToSend = "Salut " + user?.name + ", suite à votre réclamation numéro " + reclamation?.numero + " qui concerne : " + reclamation?.description + ", voici la réponse de l'administrateur : " + message;
    const phone = "+216"+user?.phone || '';
    this.createMessageTwilio(messageToSend,phone);


    const nouvelleMessagefromAdmin = new Message({
      user :user,
      from:"Admin",
      description: messageToSend,
      date_creation: new Date(),
    });

    this.createMessage(nouvelleMessagefromAdmin);


    return "message Created !"
    
  }



  async allMessagesByUser(userId: string): Promise<IMessage[]> {
    try {
      return await this.messageRepository.byUser(userId);
    } catch (error) {
      throw error;
    }
  }
  
  async getLastMessageByUser(userId: string): Promise<IMessage | null> {
    try {
      const messages = await Message.aggregate([
        { $sort: { date_creation: -1 } }, // Sort messages by date_creation in descending order
        { $group: { _id: "$user", message: { $first: "$$ROOT" } } }, // Group by user and get the first message for each user
        { $replaceWith: "$message" }, // Replace the group result with the original message document
      ]);

      if (messages.length === 0) {
        return null; // No messages found
      }

      const mostRecentMessage = messages.reduce((prev, current) =>
        prev.date_creation > current.date_creation ? prev : current
      );

      return mostRecentMessage; // Return the most recent message
    } catch (error) {
      throw error;
    }
  }



  async adminMessage(message: string, userId: string) {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        throw new Error('User not found');
      }
  
      const nouvelleMessagefromAdmin = new Message({
        user: user,
        from: "Admin",
        description: message,
        date_creation: new Date(),
      });
  
      await this.createMessage(nouvelleMessagefromAdmin);
  
      return "Message created!";
    } catch (error) {
      console.error('Error creating message:', error);
      throw new Error('Failed to create message');
    }
  }
  
  
  
  
  
  
  

}






