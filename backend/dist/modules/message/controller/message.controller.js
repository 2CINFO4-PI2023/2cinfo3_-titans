"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const DuplicatedError_1 = require("../../../errors/DuplicatedError");
class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = req.body;
                const data = yield this.messageService.createMessage(message);
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof DuplicatedError_1.DuplicatedError) {
                    return res.status(error.http_code).json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const message = yield this.messageService.getMessage(id);
                if (!message) {
                    return res.status(404).json({ message: "Message not found" });
                }
                res.json(message);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getbyUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const message = yield this.messageService.allMessagesByUser(id);
                if (!message) {
                    return res.status(404).json({ message: "Message not found" });
                }
                res.json(message);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    askchatbot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messageprompt = req.body.message;
                const id = req.params.id;
                const message = yield this.messageService.askchatbot(id, messageprompt);
                res.json(message);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    adminMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = req.body.message;
            const iduser = req.params.idUser;
            const replay = yield this.messageService.adminMessage(message, iduser);
            res.json(replay);
        });
    }
    reclamtionReplyMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = req.body.message;
                const iduser = req.params.idUser;
                const idReclamation = req.params.idReclamation;
                const replay = yield this.messageService.reclamtionReplyMessage(message, iduser, idReclamation);
                res.json(replay);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield this.messageService.allMessages();
                res.json(messages);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const message = req.body;
                yield this.messageService.updateMessage(id, message);
                res.json({ message: "Message updated successfully" });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.messageService.deleteMessage(id);
                res.json({ message: "Message deleted successfully" });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.MessageController = MessageController;
