import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  static authenticatedSubject: any;
  constructor(private http: HttpClient) {}
  private authenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public authenticated$: Observable<boolean> =
    this.authenticatedSubject.asObservable();

  static decodeJwt(token: string): any {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedData = atob(base64);
    const decodedToken = JSON.parse(decodedData);
    return decodedToken;
  }
  login(body: any) {
    // return this.http.post(`${environment.base_url}/auth/login`, body).pipe(
    //   switchMap((response: any) => {
    //     const { user } = AuthService.decodeJwt(response.accessToken);
    //     localStorage.setItem("fo_accessToken", response.accessToken);
    //     return of(user);
    //   })
    // );
    return this.http.post(`${environment.base_url}/auth/login`, body).pipe(
      switchMap((response: any) => {
        const { user } = AuthService.decodeJwt(response.accessToken);
        localStorage.setItem("fo_accessToken", response.accessToken);
        this.authenticatedSubject.next(true); // Set the authentication state to true
        return of(user);
      })
    );
  }
  signup(body: any) {
    return this.http.post(`${environment.base_url}/auth/signup`, body);
  }
  updateUser(id: string, body: any) {
    return this.http.put(`${environment.base_url}/users/${id}`, body);
  }
  static getUser() {
    const { user } = AuthService.decodeJwt(
      localStorage.getItem("fo_accessToken")
    );
    return user;
  }
  static getToken() {
    return localStorage.getItem("fo_accessToken");
  }
  static signOut() {
    localStorage.removeItem("fo_accessToken");
    this.authenticatedSubject.next(false);
  }
  static isAuthenticated(): boolean {
    return localStorage.getItem("fo_accessToken") != null;
  }
  onForgetPassword(email: any) {
    return this.http.post(
      `${environment.base_url}/auth/request-reset-password`,
      { email }
    );
  }
}
