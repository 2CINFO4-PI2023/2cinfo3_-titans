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
  profileErrMsg: string;
  profileForm: FormGroup;
  updatePassword: boolean;
  user: any;
  avatar: any;
  ngOnInit() {
    const user = this.authService.getUser().subscribe((user) => {
      this.user = user;
      this.avatar = user.image;
      this.profileForm = new FormGroup({
        phone: new FormControl(user.phone, [
          Validators.required,
          Validators.pattern(
            /^\+216(20|21|22|23|24|25|26|27|28|29|50|52|53|54|55|56|58|90|91|92|93|94|95|96|97|98|99)\d{6}$/
          ),
        ]),
        email: new FormControl(user.email, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl(""),
        name: new FormControl(user.name, [Validators.required]),
        photo: new FormControl(null),
      });
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
    const passwordControl = this.profileForm.get("password");
    passwordControl.setValidators(this.getPasswordValidators());
    passwordControl.updateValueAndValidity();
  }

  profile(form: any) {
    this.profileForm.disable();
    const data = new FormData();
    data.append("phone", this.profileForm.get("phone").value);
    data.append("email", this.profileForm.get("email").value);
    data.append("password", this.profileForm.get("password").value);
    data.append("name", this.profileForm.get("name").value);
    data.append("photo", this.profileForm.get("photo").value);
    this.authService
      .updateUser(this.user._id, data)
      .subscribe(
        (res) => {
          console.log(res);
          this.authService.updateAuthentifiedUser(res);
          this.profileErrMsg = "";
          this.profileForm.enable();
        },
        (error: any) => {
          this.profileInfoMsg = "";
          if (error.status == 409) {
            this.profileForm.enable();
            this.profileErrMsg =
              "l'adresse email ou phone est déjà associée à un utilisateur";
          } else {
            this.profileErrMsg =
              "une erreur technique est survenue. veuillez réessayer dans quelques minutes";
          }
        }
      );
  }

  onAvatarChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      // Create a FileReader to read the selected image and create an Object URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatar = e.target.result; // Set the Object URL as the image preview
        this.profileForm.get("photo").setValue(file); // Update the form control value with the selected file
      };
      reader.readAsDataURL(file);
    }
  }
}
