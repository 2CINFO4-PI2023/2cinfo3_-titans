import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-forget-password',
  templateUrl: './update-forget-password.component.html',
  styleUrls: ['./forget-password.component.sass']
})
export class UpdateForgetPasswordComponent implements OnInit {

  errMsg: string;
  formData = {
    otp:"",
    newPassword:""
  }
  constructor(private _authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(value:any){
    this._authService.updateForgetPassword(this.formData).subscribe(()=>{
      console.log("test")
      this.router.navigate(["/home"]);
    },(err)=>{
      this.errMsg = "A technical error has occurred. Please try again in a few minutes";
    })
  }
}
