import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:9090';
  user: any;
 
  constructor(private http: HttpClient,private authService:AuthService) { 
    this.authService.getUser().subscribe((user)=>{
      this.user = user
    })
  }

  createReclamation(reclamation: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${AuthService.getToken()}`);
    return this.http.post<any>(this.apiUrl+"/reclamations/"+this.user._id, reclamation, { headers });
  }

  getNewStatusId()
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${AuthService.getToken()}`);
    return this.http.get<any>(this.apiUrl+"/statuts/new",  { headers });



  }

  
}
