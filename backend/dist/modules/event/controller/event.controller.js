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
exports.EventController = void 0;
const DuplicatedError_1 = require("../../../errors/DuplicatedError");
class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = req.body;
                const data = yield this.eventService.createEvent(event);
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
                const event = yield this.eventService.getEvent(id);
                if (!event) {
                    return res.status(404).json({ message: "Event not found" });
                }
                res.json(event);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this.eventService.allEvents();
                res.json(events);
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
                const event = req.body;
                yield this.eventService.updateEvent(id, event);
                res.json({ message: "Event updated successfully" });
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
                yield this.eventService.deleteEvent(id);
                res.json({ message: "Event deleted successfully" });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.EventController = EventController;
