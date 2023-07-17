import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Message } from './message.types';

@Injectable({
    providedIn: 'root'
})
export class MessageService
{
    private _user: ReplaySubject<Message> = new ReplaySubject<Message>(1);
    private _loggedInMessage: Message;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    setLoggedInMessage(user: Message): void {
        this._loggedInMessage = user;
        this._user.next(user);
    }

    /**
     * Get the currently logged-in user
     */
    getLoggedInMessage(): Message {
        return this._loggedInMessage;
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: Message)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<Message>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<Message>
    {
        return this._httpClient.get<Message>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    
   
    getMessage(id:any): Observable<Message[]> {
        // return this._httpClient.get(`${environment.baseUrl}users/${id}`)
        return this._httpClient.get<any>(`${environment.baseUrl}message/messages/`+id).pipe(
          map(messages => {
            const transformedMessages: Message[] = messages.map(message => ({
              id: message._id,
              chatId: '',
              isMine: message.from === 'Admin' ? true : false,
              contactId:  '',
              value: message.description,
              createdAt: message.date_creation || ''
            }));
            return transformedMessages;
          })
        );
      }
}
