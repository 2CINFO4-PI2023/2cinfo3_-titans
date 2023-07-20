import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:9090'; 
private user:any
  constructor(private http: HttpClient,private authService:AuthService) {
    this.authService.getUser().subscribe((user)=>{
      this.user = user
    })
  }

  getMessages(): Observable<any[]> {
    const url = `${this.baseUrl}/message/messages/${this.user._id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${AuthService.getToken()}`
    });

    return this.http.get<any[]>(url, { headers });
  }

  askChatbot( message: string): Observable<any> {
    const url = `${this.baseUrl}/message/`+this.user._id;
    const body = { message };

    return this.http.post<any>(url, body);
  }
}
