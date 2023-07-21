import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // static authenticatedSubject: any;
  // static userSubject: any;
  constructor(private http: HttpClient, private router: Router) {}

  // private authenticatedSubject: BehaviorSubject<any> =
  //   new BehaviorSubject<any>(false);
  // public authenticated$: Observable<any> =
  //   this.authenticatedSubject.asObservable();

    
  // private userSubject: BehaviorSubject<any> =
  // new BehaviorSubject<any>(false);
  // static user$: Observable<any> =
  // AuthService.userSubject.asObservable();

  private authenticatedSubject: BehaviorSubject<any> =
  new BehaviorSubject<any>(false);
public authenticated$: Observable<any> =
  this.authenticatedSubject.asObservable();

private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
public user$: Observable<any> = this.userSubject.asObservable();

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
          this.http
          .post(`${environment.base_url}/auth/login-token`, {
            token: response.accessToken,
          })
          .subscribe((data) => {
            this.userSubject.next(data)
            return this.authenticatedSubject.next(true);
          });
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
   getUser() {
    return this.user$
    // const { user } = AuthService.decodeJwt(
    //   localStorage.getItem("fo_accessToken")
    // );
    // return user;
  }
  
  updateAuthentifiedUser(user) {
    return this.userSubject.next(user)
    // const { user } = AuthService.decodeJwt(
    //   localStorage.getItem("fo_accessToken")
    // );
    // return user;
  }
   getAuthentified() {
    return this.user$
    // const { user } = AuthService.decodeJwt(
    //   localStorage.getItem("fo_accessToken")
    // );
    // return user;
  }
  static getToken() {
    return localStorage.getItem("fo_accessToken");
  }
  signOut() {
    this.authenticatedSubject.next(false);
    localStorage.removeItem("fo_accessToken");
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
  loginWithGoogle() {
    const authUrl = `${environment.base_url}/auth/login/google`;
    const popup = window.open(authUrl, '_blank', 'width=500,height=600');
   
    window.addEventListener('message', (event) => {
      const urlParams = new URLSearchParams(event.data);
      const jwt = urlParams.get('jwt');
        if (jwt) {
          localStorage.setItem("fo_accessToken", jwt);
          this.http
          .post(`${environment.base_url}/auth/login-token`, {
            token: jwt,
          })
          .subscribe((data) => {
            this.userSubject.next(data)
            this.authenticatedSubject.next(true);
            this.router.navigate(['/home/products/all']);
          });
        } else {
          console.log("else")
        }
    });
  }
}
