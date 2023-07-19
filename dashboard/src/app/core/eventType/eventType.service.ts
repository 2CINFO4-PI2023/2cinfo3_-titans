import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EventType } from './eventType.types';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {
  private _eventType: ReplaySubject<EventType> = new ReplaySubject<EventType>(1);
  private _loggedInEventType: EventType;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  setLoggedInEventType(eventType: EventType): void {
    console.log("eventType: ",eventType);
    this._loggedInEventType = eventType;
    this._eventType.next(eventType);
  }

  /**
   * Get the currently logged-in eventType
   */
  getLoggedInEventType(): EventType {
    return this._loggedInEventType;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for eventType
   *
   * @param value
   */
  set eventType(value: EventType) {
    // Store the value
    this._eventType.next(value);
  }

  get eventType$(): Observable<EventType> {
    return this._eventType.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current logged-in eventType data
   */
  get(): Observable<EventType> {
    return this._httpClient.get<EventType>('api/common/eventType').pipe(
      tap((eventType) => {
        this._eventType.next(eventType);
      })
    );
  }

  /**
   * Update the eventType
   *
   * @param eventType
   */
  update(eventType: EventType): Observable<any> {
    return this._httpClient.patch<EventType>('api/common/eventType', { eventType }).pipe(
      map((response) => {
        this._eventType.next(response);
      })
    );
  }

  getEventTypes(
    
  ): Observable<any> {
   return this._httpClient.get(`${environment.baseUrl}types`);
  }

  deleteEventType(id: string) {
    return this._httpClient.delete(`${environment.baseUrl}types/${id}`);
  }

  getEventType(id: string) {
    return this._httpClient.get(`${environment.baseUrl}types/${id}`);
  }

  updateEventType(id: string, data: any) {
    return this._httpClient.put(`${environment.baseUrl}types/${id}`, data);
  }

  addEventType(data: any) {
    return this._httpClient.post(`${environment.baseUrl}types`, data);
  }

  toggleConfirmation(id: string, confirmed: boolean) {
    return this._httpClient.patch(`${environment.baseUrl}eventTypes/${id}/confirmed`, { confirmed });
  }
}
