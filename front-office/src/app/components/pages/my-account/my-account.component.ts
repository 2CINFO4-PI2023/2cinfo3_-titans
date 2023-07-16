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
          if (error.status == 401) {
            this.loginErrMsg = "Login ou mot de passe invalide";
          } else {
            this.loginErrMsg =
              "une erreur technique est survenue. veuillez réessayer dans quelques minutes";
          }
        }
      );
  }

  signup(form: any) {
    this.signupForm.disable()
    this.authService.signup(this.signupForm.value).subscribe(
      (res) => {
        this.signupErrMsg = "";
        this.signupInfoMsg =
          "Vous allez recevoir un e-mail pour valider votre compte";
          this.signupForm.enable()
          this.signupForm.reset()
      },
      (error: any) => {
        this.signupInfoMsg = "";
        if (error.status == 409) {
          this.signupForm.enable()
          this.signupForm.reset()
          this.signupErrMsg =
            "l'adresse email ou phone est déjà associée à un utilisateur";
        } else {
          this.signupErrMsg =
            "une erreur technique est survenue. veuillez réessayer dans quelques minutes";
        }
      }
    );
  }
}
