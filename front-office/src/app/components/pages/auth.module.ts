import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BlogModule } from '../blog/blog.module';
import { SharedModule } from '../shared/shared.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateForgetPasswordComponent } from './forget-password/update-forget-password.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    BlogModule,
    MatCheckboxModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPM6HA96FiWhoVieMmF0T-segiya5Ytf8'
    }),
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    MyAccountComponent,
    ProfileComponent,
    ForgetPasswordComponent,
    UpdateForgetPasswordComponent
  ]
})
export class AuthModule { }
