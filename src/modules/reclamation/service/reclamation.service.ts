import { NotFoundError } from "../../../errors/NotFoundError";
import { ITypereclamation, Typereclamation } from "../../typereclamation/model/typereclamation.schema";
import { IReclamation } from "../model/reclamation.schema";
import { IReclamationBody } from "../dto/reclamationBody";
import { IReclamationRepository } from "../repository/reclamation.repository";




export interface IReclamationService {
  createReclamation(reclamation: IReclamation): IReclamation | Promise<IReclamation>;
  getReclamation(id: string): Promise<IReclamation | null>;
  allReclamations(): Promise<IReclamation[]>;
  deleteReclamation(id: string): void;
  updateReclamation(id: string, reclamation: IReclamation): void;
}

export class ReclamationService implements IReclamationService {
  constructor(private reclamationRepository: IReclamationRepository) {}

  async createReclamation(reclamation: IReclamation): Promise<IReclamation> {
    try {
      const { type } = reclamation;

      // Check if the type exists in the Typereclamation collection
      const existingType = await Typereclamation.findById(type);
      if (!existingType) {
        throw new NotFoundError("Invalid type provided.");
      }

      return await this.reclamationRepository.create(reclamation);
    } catch (error) {
      throw error;
    }
  }

  async getReclamation(id: string): Promise<IReclamation | null> {
    try {

     


    const message="je veut passer une commande de box pizza avec la recette?"
   
        const prompt="Bonjour, vous \u00EAtes maintenant administrateur nomm\u00E9 Titan sur un site qui vend des bo\u00EEtes d\'ingr\u00E9dients pour pr\u00E9parer des plats. Chaque fois,\r\n vous recevrez la quantit\u00E9 des ingr\u00E9dients et les recettes et le message client en forme json , et vous devrez simplement r\u00E9pondre au client . \u00C0 chaque fois tu doit soit repondre au client soit \r\nenvoyer une action comme pass commande , create une reclamation ,etc ...\r\ntout reponce doit etre en un seule  json, rien que json  \r\nsi quelque un dit un grand mot tu doit bloquer son user pour tester on cansidere 00001 est un grand mot \r\nsi qulque un dit un question hors sujet tu doit pas repondre tu doit cacher que tu est une iA \r\nsi il ya un reclamation tu doit ajouter un json reclamation exemple :\r\n{\r\n\"action\": \"create_reclamation\",\r\n\"reclamation\": {\r\n\"numero\": \"RC-2023-1234\",\r\n\"date_creation\": \"2023-06-23\",\r\n\"statut\": \"En attente d\'examen\",\r\n\"description\": \"R\u00E9clamation concernant l\'absence d\'huile dans la box de pizza command\u00E9e\"\r\n},\r\n\"reponse au client\": \"Bonjour Saif Chtourou, nous sommes d\u00E9sol\u00E9s pour cet inconv\u00E9nient. Nous prendrons imm\u00E9diatement des mesures pour r\u00E9soudre ce probl\u00E8me. Je vais cr\u00E9er une r\u00E9clamation pour vous concernant l\'absence d\'huile dans votre box de pizza. Notre \u00E9quipe va examiner la situation et vous contacter pour trouver une solution satisfaisante. Merci de nous avoir inform\u00E9s et nous vous prions d\'accepter nos excuses pour cet oubli. Si vous avez d\'autres questions ou pr\u00E9occupations, n\'h\u00E9sitez pas \u00E0 les partager avec nous. Nous traiterons votre r\u00E9clamation dans les plus brefs d\u00E9lais et vous tiendrons inform\u00E9 de toute avanc\u00E9e. Votre satisfaction est notre priorit\u00E9. Nous vous remercions de votre compr\u00E9hension et de votre patience.\"\r\n}\r\n\r\npour commander\r\n\r\n{\r\n\"action\": \"coamnder\",\r\n\"recette\": {\r\n {\r\n      \"nom\": \"pizza\",\r\n      \"ingredients\": [\r\n        {\r\n          \"nom\": \"oignon\",\r\n          \"quantite\": 1,\r\n          \"mesure\": \"unit\u00E9\"\r\n        },\r\n        {\r\n          \"nom\": \"fromage\",\r\n          \"quantite\": 200,\r\n          \"mesure\": \"grammes\"\r\n        },\r\n        {\r\n          \"nom\": \"tomate\",\r\n          \"quantite\": 2,\r\n          \"mesure\": \"unit\u00E9\"\r\n        }\r\n      ]\r\n    },\r\n\"reponse au client\": \"bla bla \"\r\n} \r\n\r\n\r\nsi vous ete bloquer sur quelque chause tu doit imaginer n\'importe quelle situation et reponde\r\nexemple input :\r\n{\r\n  \"message\": \"Salut\",\r\n\"user\":{\r\n\"name\":\"saif chtourou\",\r\n\"email\":\"saif.chtourou@gmail.com\"\r\n\r\n\r\n}\r\n  \"ingredients\": [\r\n    {\r\n      \"nom\": \"oignon\",\r\n      \"quantite\": 20,\r\n      \"mesure\": \"kg\"\r\n    },\r\n    {\r\n      \"nom\": \"pommes de terre\",\r\n      \"quantite\": 90,\r\n      \"mesure\": \"kg\"\r\n    },\r\n    {\r\n      \"nom\": \"huile\",\r\n      \"quantite\": 900,\r\n      \"mesure\": \"litres\"\r\n    }\r\n  ],\r\n  \"recettes\": [\r\n    {\r\n      \"nom\": \"pizza\",\r\n      \"ingredients\": [\r\n        {\r\n          \"nom\": \"oignon\",\r\n          \"quantite\": 1,\r\n          \"mesure\": \"unit\u00E9\"\r\n        },\r\n        {\r\n          \"nom\": \"fromage\",\r\n          \"quantite\": 200,\r\n          \"mesure\": \"grammes\"\r\n        },\r\n        {\r\n          \"nom\": \"tomate\",\r\n          \"quantite\": 2,\r\n          \"mesure\": \"unit\u00E9\"\r\n        }\r\n      ]\r\n    },\r\n    {\r\n      \"nom\": \"autre recette\",\r\n      \"ingredients\": [\r\n        {\r\n          \"nom\": \"oignon\",\r\n          \"quantite\": 2,\r\n          \"mesure\": \"unit\u00E9\"\r\n        },\r\n        {\r\n          \"nom\": \"ail\",\r\n          \"quantite\": 3,\r\n          \"mesure\": \"gousses\"\r\n        },\r\n        {\r\n          \"nom\": \"sel\",\r\n          \"quantite\": 10,\r\n          \"mesure\": \"grammes\"\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}\r\n\r\nexemple output:\r\n\r\n{\r\n\"action\" : null,\r\n\"reponce au client \":\"Bonjour Saif Chtourou,Merci de nous avoir contact\u00E9s ! Comment puis-je vous aider aujourd\'hui ? Note : En tant qu\'administrateur, je peux vous fournir des informations sur les produits, les recettes ou toute autre question que vous pourriez avoir. N\'h\u00E9sitez pas \u00E0 me demander ce dont vous avez besoin !\"\r\n} \r\n\r\ninput : \r\n{\r\n  \"message\": \""+message+"\",\r\n\"user\":{\r\n\"name\":\"saif chtourou\",\r\n\"email\":\"saif.chtourou@gmail.com\"\r\n\r\n\r\n}\r\n  \"ingredients\": [\r\n    {\r\n      \"nom\": \"oignon\",\r\n      \"quantite\": 20,\r\n      \"mesure\": \"kg\"\r\n    },\r\n    {\r\n      \"nom\": \"pommes de terre\",\r\n      \"quantite\": 90,\r\n      \"mesure\": \"kg\"\r\n    },\r\n    {\r\n      \"nom\": \"huile\",\r\n      \"quantite\": 900,\r\n      \"mesure\": \"litres\"\r\n    }\r\n  ],\r\n  \"recettes\": [\r\n    {\r\n      \"nom\": \"pizza\",\r\n      \"ingredients\": [\r\n        {\r\n          \"nom\": \"oignon\",\r\n          \"quantite\": 1,\r\n          \"mesure\": \"unit\u00E9\"\r\n        },\r\n        {\r\n          \"nom\": \"fromage\",\r\n          \"quantite\": 200,\r\n          \"mesure\": \"grammes\"\r\n        },\r\n        {\r\n          \"nom\": \"tomate\",\r\n          \"quantite\": 2,\r\n          \"mesure\": \"unit\u00E9\"\r\n        }\r\n      ]\r\n    },\r\n    {\r\n      \"nom\": \"autre recette\",\r\n      \"ingredients\": [\r\n        {\r\n          \"nom\": \"oignon\",\r\n          \"quantite\": 2,\r\n          \"mesure\": \"unit\u00E9\"\r\n        },\r\n        {\r\n          \"nom\": \"ail\",\r\n          \"quantite\": 3,\r\n          \"mesure\": \"gousses\"\r\n        },\r\n        {\r\n          \"nom\": \"sel\",\r\n          \"quantite\": 10,\r\n          \"mesure\": \"grammes\"\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}"

      const { Configuration, OpenAIApi } = require("openai");


      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);

      const completion = await openai.createChatCompletion({ 
        model: "gpt-3.5-turbo",
      // replace prompt with messages and set prompt as content with a role.
        messages: [{role: "user", content: prompt}], 
      });
     
      console.log(completion.data.choices[0].message);
      
      const startIndex = completion.data.choices[0].message.content.indexOf("{");
const endIndex = completion.data.choices[0].message.content.lastIndexOf("}");
const jsonResponse = completion.data.choices[0].message.content.substring(startIndex, endIndex + 1);

// Transformer la chaîne de caractères en objet JSON
const parsedResponse = JSON.parse(jsonResponse);
console.log(parsedResponse);

      const reclamation = await this.reclamationRepository.get(id);
      const type = await Typereclamation.findById(reclamation?.type);

      
     
     
      
        const reclamationBody: IReclamationBody = {
          _id: id,
          name: reclamation?.name ?? "",
          email: reclamation?.email ?? "",
          phone: reclamation?.phone ?? "",
          type: {
            _id: type?.id ?? "",
            type: type?.type ?? "",
            stype: type?.stype ?? "",
          },
          message: reclamation?.message ?? "",
        };
      
   
  
      return parsedResponse;
    } catch (error) {
      throw error;
    }
  }
  

  async allReclamations(): Promise<IReclamation[]> {
    try {
      return await this.reclamationRepository.all();
    } catch (error) {
      throw error;
    }
  }

  async deleteReclamation(id: string): Promise<void> {
    try {
      await this.reclamationRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateReclamation(id: string, reclamation: IReclamation): Promise<void> {
    try {
      await this.reclamationRepository.update(id, reclamation);
    } catch (error: any) {
      throw error;
    }
  }


  async populateType(typeId: string): Promise<ITypereclamation | null> {
    try {
      const type = await Typereclamation.findById(typeId);
      return type;
    } catch (error) {
      throw error;
    }
  }
  
}

