import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}
  login(body:any){
    return this.http.post(`${environment.base_url}/auth/login`,body)
  }
  signup(body:any){
    return this.http.post(`${environment.base_url}/auth/signup`,body)
  }
}
