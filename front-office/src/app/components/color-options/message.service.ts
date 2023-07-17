import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:9090'; 

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any[]> {
    const url = `${this.baseUrl}/message/messages/${AuthService.getUser()._id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${AuthService.getToken()}`
    });

    return this.http.get<any[]>(url, { headers });
  }

  askChatbot( message: string): Observable<any> {
    const url = `${this.baseUrl}/message/`+AuthService.getUser()._id;
    const body = { message };

    return this.http.post<any>(url, body);
  }
}
