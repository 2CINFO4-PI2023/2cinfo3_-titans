import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, throwError } from "rxjs";
import { switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  static decodeJwt(token: string): any {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedData = atob(base64);
    const decodedToken = JSON.parse(decodedData);
    return decodedToken;
  }
  login(body: any) {
    return this.http.post(`${environment.base_url}/auth/login`, body).pipe(
      switchMap((response: any) => {
        const { user } = AuthService.decodeJwt(response.accessToken);
        // if (user.role !== 99) {
        //     return throwError('User role is not authorized.'); // Throw an error if the user's role is not 99
        // }
        localStorage.setItem("fo_accessToken", response.accessToken);
        return of(user);
      })
    );
  }
  signup(body: any) {
    return this.http.post(`${environment.base_url}/auth/signup`, body);
  }
  updateUser(id:string,body: any) {
    return this.http.put(`${environment.base_url}/users/${id}`, body);
  }
  static getUser() {
    const { user } = AuthService.decodeJwt(localStorage.getItem("fo_accessToken"));
    return user;
  }
  static getToken() {
    return localStorage.getItem("fo_accessToken")
  }
  static signOut(){
    return localStorage.removeItem("fo_accessToken")

  }
  static isAuthenticated(): boolean{
    return localStorage.getItem("fo_accessToken") != null
  }
}
