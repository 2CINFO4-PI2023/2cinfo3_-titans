import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChatService } from './chat.service';
import { Chat, Contact, Profile } from './chat.types';


@Injectable({
    providedIn: 'root'
})
export class ChatChatsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _chatService: ChatService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chat[]> | any
    {
        return this._chatService.getChats();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ChatChatResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _chatService: ChatService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chat>
    {
      return null;
    }
}

@Injectable({
    providedIn: 'root'
})
export class ChatContactsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _chatService: ChatService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]> | any
    {
        return this._chatService.getContacts();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ChatProfileResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _chatService: ChatService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> | any
    {
        return this._chatService.getProfile();
    }
}
