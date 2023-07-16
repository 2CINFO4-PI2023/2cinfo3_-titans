import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:9090';
  private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0OGM2NmM5OGYwZTE0NjI2MmRhY2ZkNSIsIm5hbWUiOiJTYWlmICIsImVtYWlsIjoic2FpZi5jaHRvdXJvdUBlc3ByaXQudG4iLCJwaG9uZSI6IjEyMzQ1Njc4IiwiYWRkcmVzcyI6IjEyMyBNYWluIFN0LCBDaXR5IiwicGFzc3dvcmQiOiIkMmIkMTAkbWZkaWFVT1NZVTVna29vN29LOFFxLkRBMVo1bE5kWjZKNFpyN0pEWVFvSmZZMjFjZ3hwYXUiLCJpc0FjdGl2ZSI6dHJ1ZSwiX192IjowfSwiaWF0IjoxNjg5NTEwMDY0LCJleHAiOjE2ODk1MTE4NjR9.-7VgC3SOwRz3j9W3e9PN2xQCm2OFVxJP5s6nRRzUBUU'; // Replace with your actual authorization token

  constructor(private http: HttpClient) { }

  createReclamation(reclamation: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
    return this.http.post<any>(this.apiUrl+"/reclamations/648c66938f0e146262dacfcf", reclamation, { headers });
  }

  getNewStatusId()
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
    return this.http.get<any>(this.apiUrl+"/statuts/new",  { headers });



  }
}
