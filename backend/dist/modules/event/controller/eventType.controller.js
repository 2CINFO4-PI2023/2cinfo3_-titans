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
exports.EventTypeController = void 0;
class EventTypeController {
    constructor(eventTypeService) {
        this.eventTypeService = eventTypeService;
        this.createEventType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const eventType = req.body;
                const createdEventType = yield this.eventTypeService.createEventType(eventType);
                res.status(201).json(createdEventType);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
        this.getAllEventTypes = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const eventTypes = yield this.eventTypeService.getAllEventTypes();
                res.json(eventTypes);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
        this.getEventTypeById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const eventType = yield this.eventTypeService.getEventTypeById(id);
                if (!eventType) {
                    res.status(404).json({ message: "EventType not found" });
                    return;
                }
                res.json(eventType);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
        this.updateEventType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const eventType = req.body;
                yield this.eventTypeService.updateEventType(id, eventType);
                res.json({ message: "EventType updated successfully" });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
        this.deleteEventType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.eventTypeService.deleteEventType(id);
                res.json({ message: "EventType deleted successfully" });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
        this.getEventCountByType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const eventTypeId = req.params.eventTypeId;
                const eventCountByType = yield this.eventTypeService.getEventCountByType(eventTypeId);
                res.json(eventCountByType);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.EventTypeController = EventTypeController;
