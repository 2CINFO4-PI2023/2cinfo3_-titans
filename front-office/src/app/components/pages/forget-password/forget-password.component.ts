import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

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
  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(value:any){
    console.log("value: ",value)
    this._authService.onForgetPassword(this.formData.email).subscribe(()=>{},(err)=>{
      this.errMsg = "A technical error has occurred. Please try again in a few minutes";
    })
  }
}
