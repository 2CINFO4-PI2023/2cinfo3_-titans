import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:9090'; 
  private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0OGM2NmM5OGYwZTE0NjI2MmRhY2ZkNSIsIm5hbWUiOiJTYWlmICIsImVtYWlsIjoic2FpZi5jaHRvdXJvdUBlc3ByaXQudG4iLCJwaG9uZSI6IjEyMzQ1Njc4IiwiYWRkcmVzcyI6IjEyMyBNYWluIFN0LCBDaXR5IiwicGFzc3dvcmQiOiIkMmIkMTAkbWZkaWFVT1NZVTVna29vN29LOFFxLkRBMVo1bE5kWjZKNFpyN0pEWVFvSmZZMjFjZ3hwYXUiLCJpc0FjdGl2ZSI6dHJ1ZSwiX192IjowfSwiaWF0IjoxNjg5NTEwMDY0LCJleHAiOjE2ODk1MTE4NjR9.-7VgC3SOwRz3j9W3e9PN2xQCm2OFVxJP5s6nRRzUBUU';

  constructor(private http: HttpClient) {}

  getMessages(userId: string): Observable<any[]> {
    const url = `${this.baseUrl}/message/messages/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<any[]>(url, { headers });
  }

  askChatbot(userId: string, message: string): Observable<any> {
    const url = `${this.baseUrl}/message/${userId}`;
    const body = { message };

    return this.http.post<any>(url, body);
  }
}
