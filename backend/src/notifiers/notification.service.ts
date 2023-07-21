import Pusher = require("pusher")

export class Notifier {

    push(data:any){
        this.pusher.trigger(<string>process.env.PUSHER_CHANNEL,<string>process.env.PUSHER_EVENT, {ingredients: data});
    }
    /**
     * constructor
     */
    constructor(private pusher:Pusher) {}
}
