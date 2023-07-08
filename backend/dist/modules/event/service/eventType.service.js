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
exports.EventTypeService = void 0;
class EventTypeService {
    constructor(eventTypeRepository) {
        this.eventTypeRepository = eventTypeRepository;
    }
    createEventType(eventType) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventTypeRepository.create(eventType);
        });
    }
    getAllEventTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventTypeRepository.getAll();
        });
    }
    getEventTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventTypeRepository.getById(id);
        });
    }
    updateEventType(id, eventType) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventTypeRepository.update(id, eventType);
        });
    }
    deleteEventType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventTypeRepository.delete(id);
        });
    }
}
exports.EventTypeService = EventTypeService;
