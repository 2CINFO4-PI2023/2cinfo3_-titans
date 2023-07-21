import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Commande } from './commande.types';

@Injectable({
    providedIn: 'root'
})
export class CommandeService
{
    private _commande: ReplaySubject<Commande> = new ReplaySubject<Commande>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set commande(value: Commande)
    {
        // Store the value
        this._commande.next(value);
    }

    get commande$(): Observable<Commande>
    {
        return this._commande.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<Commande>
    {
        return this._httpClient.get<Commande>('api/common/commande').pipe(
            tap((commande) => {
                this._commande.next(commande);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(commande: Commande): Observable<any>
    {
        return this._httpClient.patch<Commande>('api/common/commande', {commande}).pipe(
            map((response) => {
                this._commande.next(response);
            })
        );
    }
    getCommandes(
        page: number = 1,
        pageSize: number = 10,
        filters: { [key: string]: string } = {},
        sortField: string = '',
        sortOrder: 'asc' | 'desc' = 'asc'
      ): Observable<any> {
        let params = new HttpParams();
    
        params = params.append('page', page.toString());
        params = params.append('pageSize', pageSize.toString());
    
        Object.keys(filters).forEach((key) => {
          if (filters[key] !== '') {
            params = params.append(key, filters[key]);
          }
        });
    
        if (sortField !== '' && (sortOrder === 'asc' || sortOrder === 'desc')) {
          params = params.append('sortField', sortField);
          params = params.append('sortOrder', sortOrder);
        }
    
        return this._httpClient.get(`${environment.baseUrl}commandes`, { params });
      }
    deleteCommande(id:string){
        return this._httpClient.delete(`${environment.baseUrl}commandes/${id}`)
    }
    getCommande(id:string){
        return this._httpClient.get(`${environment.baseUrl}commandes/${id}`)
    }
    updateCommande(id:string,data:any){
        return this._httpClient.put(`${environment.baseUrl}commandes/${id}`,data)
    }
    addCommande(data:any){
        return this._httpClient.post(`${environment.baseUrl}commandes`,data)
    }
    toggleConfirmation(id:string,confirmed:boolean){
        return this._httpClient.patch(`${environment.baseUrl}commandes/${id}/confirmed`,{confirmed})
    }
}
