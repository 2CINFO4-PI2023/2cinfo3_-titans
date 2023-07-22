import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UpdateForgetPasswordComponent } from './forget-password/update-forget-password.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MyAccountComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'forgot-password', component: ForgetPasswordComponent },
      { path: 'reset-password', component: UpdateForgetPasswordComponent },
     
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
