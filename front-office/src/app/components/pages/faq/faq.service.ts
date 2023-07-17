import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:9090';
 
  constructor(private http: HttpClient) { }

  createReclamation(reclamation: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${AuthService.getToken()}`);
    return this.http.post<any>(this.apiUrl+"/reclamations/"+AuthService.getUser()._id, reclamation, { headers });
  }

  getNewStatusId()
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${AuthService.getToken()}`);
    return this.http.get<any>(this.apiUrl+"/statuts/new",  { headers });



  }

  
}
