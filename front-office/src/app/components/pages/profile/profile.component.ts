import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/components/shared/services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.sass"],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loginErrMsg: string;
  profileInfoMsg: string;
  profileErrMsg:string;
  profileForm: FormGroup;
  updatePassword:boolean;

  ngOnInit() {
    const user = AuthService.getUser()
     console.log("user: ",user)
    this.profileForm = new FormGroup({
      phone: new FormControl(user.phone, [
        Validators.required,
        Validators.pattern(
          /^\+216(20|21|22|23|24|25|26|27|28|29|50|52|53|54|55|56|58|90|91|92|93|94|95|96|97|98|99)\d{6}$/
        ),
      ]),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
      ]),
      name: new FormControl(user.name, [Validators.required]),
    });
  }

  
  getPasswordValidators(): any[] {
    if (this.updatePassword) {
      return [
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
      ];
    } else {
      return [];
    }
  }

  // Helper method to toggle password validation when needed
  togglePasswordValidation(): void {
    this.updatePassword = !this.updatePassword;
    const passwordControl = this.profileForm.get('password');
    passwordControl.setValidators(this.getPasswordValidators());
    passwordControl.updateValueAndValidity();
  }


  profile(form: any) {
    this.profileForm.disable()
    this.authService.updateUser(AuthService.getUser()._id,this.profileForm.value).subscribe(
      (res) => {
        this.profileErrMsg = "";
          this.profileForm.enable()
      },
      (error: any) => {
        this.profileInfoMsg = "";
        if (error.status == 409) {
          this.profileForm.enable()
          this.profileErrMsg =
            "l'adresse email ou phone est déjà associée à un utilisateur";
        } else {
          this.profileErrMsg =
            "une erreur technique est survenue. veuillez réessayer dans quelques minutes";
        }
      }
    );
  }
}
