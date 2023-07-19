import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Ingredient } from "./ingredient.types";
import { environment } from "environments/environment";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class IngredientService{
    private _ingredient: ReplaySubject<Ingredient> = new ReplaySubject<Ingredient>(1);
    
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}
    
    /**
     * Getter and Setter
     */
    get ingredient$() : Observable<Ingredient> {
        return this._ingredient.asObservable();
    }
    set ingredient(value : Ingredient) {
        this._ingredient.next(value);
    }

    /**
     * public method
     */

    getIngredients(): Observable<Ingredient[]>{

        return this._httpClient.get<Ingredient[]>(`${environment.baseUrl}ingredient`).pipe(
            map(data =>{
                return data;
            })
        )

    }
    getIngredient(id:string){
        return this._httpClient.get(`${environment.baseUrl}ingredient/${id}`)
    }
    /**
    * Update the ingredient
    *
    * @param data @param id 
    */
    updateIngredient(id:string,data:any){
        return this._httpClient.put(`${environment.baseUrl}ingredient/${id}`,data)
    }
    /**
    * delete the ingredient
    *
    * @param id
    */
    deleteIngredient(id:string){
      return this._httpClient.delete(`${environment.baseUrl}ingredient/${id}`)
    }
    /**
    * Create the ingredient
    *
    * @param data 
    */    
    createIngredient(data:any){
        return this._httpClient.post(`${environment.baseUrl}ingredient`,data)
      }
}