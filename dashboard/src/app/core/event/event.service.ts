import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _event: ReplaySubject<Event> = new ReplaySubject<Event>(1);
  private _loggedInEvent: Event;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  setLoggedInEvent(event: Event): void {
    console.log("event: ",event);
    this._loggedInEvent = event;
    this._event.next(event);
  }

  /**
   * Get the currently logged-in event
   */
  getLoggedInEvent(): Event {
    return this._loggedInEvent;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for event
   *
   * @param value
   */
  set event(value: Event) {
    // Store the value
    this._event.next(value);
  }

  get event$(): Observable<Event> {
    return this._event.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current logged-in event data
   */
  get(): Observable<Event> {
    return this._httpClient.get<Event>('api/common/event').pipe(
      tap((event) => {
        this._event.next(event);
      })
    );
  }

  /**
   * Update the event
   *
   * @param event
   */
  update(event: Event): Observable<any> {
    return this._httpClient.patch<Event>('api/common/event', { event }).pipe(
      map((response) => {
        this._event.next(response);
      })
    );
  }

  getEvents(
    
  ): Observable<any> {
   return this._httpClient.get(`${environment.baseUrl}events`);
  }

  deleteEvent(id: string) {
    return this._httpClient.delete(`${environment.baseUrl}events/${id}`);
  }

  getEvent(id: string) {
    return this._httpClient.get(`${environment.baseUrl}events/${id}`);
  }

  updateEvent(id: string, data: any) {
    return this._httpClient.put(`${environment.baseUrl}events/${id}`, data);
  }

  addEvent(data: any) {
    return this._httpClient.post(`${environment.baseUrl}events`, data);
  }

  toggleConfirmation(id: string, confirmed: boolean) {
    return this._httpClient.patch(`${environment.baseUrl}events/${id}/confirmed`, { confirmed });
  }
}
