import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { Plat } from "./plat.types";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { map, tap } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class PlatService{
    private _plat: ReplaySubject<Plat> = new ReplaySubject<Plat>(1);
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}
    get plats$() : Observable<Plat> {
        return this._plat.asObservable();
    }
    set plats(value : Plat) {
        this._plat.next(value);
    }

    /**
     * public method
     */

    getPlats(): Observable<Plat[]>{
        return this._httpClient.get<Plat[]>(`${environment.baseUrl}plats`).pipe(
            map(data =>{
                return data;
            })
        )

    }
    getPlat(id: string): Observable<Plat>{
        return this._httpClient.get<Plat>(`${environment.baseUrl}plats/${id}`);
    }
    /**
    * Update the plat
    *
    * @param data @param id 
    */
    updatePlat(id:string,data:any){
        return this._httpClient.put(`${environment.baseUrl}plats/${id}`,data)
    }
    /**
    * delete the plat
    *
    * @param id
    */
    deletePlat(id:string){
      return this._httpClient.delete(`${environment.baseUrl}plats/${id}`)
    }
    /**
    * Create the plat
    *
    * @param data 
    */    
    createPlat(data:any){
        return this._httpClient.post(`${environment.baseUrl}plats`,data)
      }
}