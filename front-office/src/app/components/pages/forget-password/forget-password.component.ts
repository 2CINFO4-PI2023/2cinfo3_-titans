import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.sass']
})
export class ForgetPasswordComponent implements OnInit {

  errMsg: string;
  formData = {
    email:""
  }
  constructor(private _authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(value:any){
    this._authService.onForgetPassword(this.formData.email).subscribe(()=>{
      this.router.navigate(["/auth/reset-password"]);
    },(err)=>{
      this.errMsg = "A technical error has occurred. Please try again in a few minutes";
    })
  }
}
