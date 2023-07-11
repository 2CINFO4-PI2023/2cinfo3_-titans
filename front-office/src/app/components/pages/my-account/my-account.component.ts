import { Component, OnInit } from "@angular/core";
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
  ngOnInit() {}

  login(form: any) {
    this.authService
      .login({ email: this.loginData.email, password: this.loginData.password })
      .subscribe(
        (res: any) => {
          localStorage.setItem("token", res.token);
          this.router.navigate(["/"]);
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
    this.authService.signup(this.signupData).subscribe(
      (res) => {
        this.signupErrMsg= ""
        this.signupInfoMsg =
          "Vous allez recevoir un e-mail pour valider votre compte";
      },
      (error: any) => {
        this.signupInfoMsg =""
        if (error.status == 409) {
          this.signupErrMsg =
            "l'adresse email est déjà associée à un utilisateur";
        } else {
          this.signupErrMsg =
            "une erreur technique est survenue. veuillez réessayer dans quelques minutes";
        }
      }
    );
  }
}
