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
exports.EventService = void 0;
class EventService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.eventRepository.create(event);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.eventRepository.get(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    allEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.eventRepository.all();
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.eventRepository.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateEvent(id, event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.eventRepository.update(id, event);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.EventService = EventService;
