import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Livraison } from './livraison.types';

@Injectable({
    providedIn: 'root'
})
export class LivraisonService
{
    private _livraison: ReplaySubject<Livraison> = new ReplaySubject<Livraison>(1);

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
    set livraison(value: Livraison)
    {
        // Store the value
        this._livraison.next(value);
    }

    get livraiosn$(): Observable<Livraison>
    {
        return this._livraison.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<Livraison>
    {
        return this._httpClient.get<Livraison>('api/common/livraison').pipe(
            tap((commande) => {
                this._livraison.next(this.livraison);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(livraison: Livraison): Observable<any>
    {
        return this._httpClient.patch<Livraison>('api/common/livraison', {livraison}).pipe(
            map((response) => {
                this._livraison.next(response);
            })
        );
    }
    getLivraisons(
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
    
        return this._httpClient.get(`${environment.baseUrl}livraison`);
      }
    deleteCommande(id:string){
        return this._httpClient.delete(`${environment.baseUrl}commandes/${id}`)
    }
    getCommande(id:string){
        return this._httpClient.get(`${environment.baseUrl}commandes/${id}`)
    }
    updateLivraison(id:string,data:any){
        return this._httpClient.put(`${environment.baseUrl}livraison/${id}`,data)
    }
    addLivraison(data:any){
        return this._httpClient.post(`${environment.baseUrl}livraison`,data)
    }
    toggleConfirmation(id:string,confirmed:boolean){
        return this._httpClient.patch(`${environment.baseUrl}commandes/${id}/confirmed`,{confirmed})
    }
}
