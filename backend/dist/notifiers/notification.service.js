"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifier = void 0;
class Notifier {
    push(data) {
        this.pusher.trigger(process.env.PUSHER_CHANNEL, process.env.PUSHER_EVENT, { ingredients: data });
    }
    /**
     * constructor
     */
    constructor(pusher) {
        this.pusher = pusher;
    }
}
exports.Notifier = Notifier;
