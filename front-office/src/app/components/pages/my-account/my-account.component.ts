import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/components/shared/services/auth.service";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.sass"],
})
export class MyAccountComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loginErrMsg: string;
  signupInfoMsg: string;
  signupForm: FormGroup;
  loginData: {
    email: String;
    password: String;
  } = {
    email: "",
    password: "",
  };

  signupErrMsg: string;
  signupData: {
    email: String;
    password: String;
    name: String;
  } = {
    email: "",
    password: "",
    name: "",
  };
  ngOnInit() {
    this.signupForm = new FormGroup({
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /^\+216(20|21|22|23|24|25|26|27|28|29|50|52|53|54|55|56|58|90|91|92|93|94|95|96|97|98|99)\d{6}$/
        ),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
      ]),
      name: new FormControl("", [Validators.required]),
    });
  }

  login(form: any) {
    this.authService
      .login({ email: this.loginData.email, password: this.loginData.password })
      .subscribe(
        (res: any) => {
          this.router.navigate(["/home/products/all"]);
        },
        (error) => {
          console.log(error);
          if (error.status == 409) {
            this.loginErrMsg = "E-mail or phone is already used";
          } else if (error.status == 401) {
            this.loginErrMsg =
              "Your account is not active please check your email";
          } else {
            this.loginErrMsg =
              "A technical error has occurred. Please try again in a few minutes";
          }
        }
      );
  }

  signup(form: any) {
    this.signupForm.disable();
    this.authService.signup(this.signupForm.value).subscribe(
      (res) => {
        this.signupErrMsg = "";
        this.signupInfoMsg =
          "You will receive an email to validate your account";
        this.signupForm.enable();
      },
      (error: any) => {
        this.signupInfoMsg = "";
        this.signupForm.enable();
        if (error.status == 409) {
          this.signupErrMsg = "E-mail or phone is already used";
        } else if (error.status == 401) {
          this.signupErrMsg =
            "Your account is not active please check your email";
        } else {
          this.signupErrMsg =
            "A technical error has occurred. Please try again in a few minutes";
        }
      }
    );
  }
  onForgotPassword() {
    this.router.navigate(["/pages/forgot-password"]);
  }
  loginWithGoogle() {
    this.authService.loginWithGoogle()
  }
}
