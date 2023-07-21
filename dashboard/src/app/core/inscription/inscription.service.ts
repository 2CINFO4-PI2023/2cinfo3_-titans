import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Inscription } from './inscription.types';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private _inscription: ReplaySubject<Inscription> = new ReplaySubject<Inscription>(1);
  private _loggedInInscription: Inscription;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  setLoggedInInscription(inscription: Inscription): void {
    console.log("inscription: ",inscription);
    this._loggedInInscription = inscription;
    this._inscription.next(inscription);
  }

  /**
   * Get the currently logged-in inscription
   */
  getLoggedInInscription(): Inscription {
    return this._loggedInInscription;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for inscription
   *
   * @param value
   */
  set inscription(value: Inscription) {
    // Store the value
    this._inscription.next(value);
  }

  get inscription$(): Observable<Inscription> {
    return this._inscription.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current logged-in inscription data
   */
  get(): Observable<Inscription> {
    return this._httpClient.get<Inscription>('api/common/inscription').pipe(
      tap((inscription) => {
        this._inscription.next(inscription);
      })
    );
  }

  /**
   * Update the inscription
   *
   * @param inscription
   */
  update(inscription: Inscription): Observable<any> {
    return this._httpClient.patch<Inscription>('api/common/inscription', { inscription }).pipe(
      map((response) => {
        this._inscription.next(response);
      })
    );
  }

  getInscriptions(
    
  ): Observable<any> {
   return this._httpClient.get(`${environment.baseUrl}inscriptions`);
  }

  deleteInscription(id: string) {
    return this._httpClient.delete(`${environment.baseUrl}inscriptions/${id}`);
  }

  getInscription(id: string) {
    return this._httpClient.get(`${environment.baseUrl}inscriptions/${id}`);
  }

  updateInscription(id: string, data: any) {
    return this._httpClient.put(`${environment.baseUrl}inscriptions/${id}`, data);
  }

  addInscription(data: any) {
    return this._httpClient.post(`${environment.baseUrl}inscriptions`, data);
  }

  toggleConfirmation(id: string, confirmed: boolean) {
    return this._httpClient.patch(`${environment.baseUrl}inscriptions/${id}/confirmed`, { confirmed });
  }
}
