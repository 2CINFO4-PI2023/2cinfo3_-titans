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
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FaqComponent } from './faq/faq.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
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
    CartComponent,
    ContactComponent,
    WishlistComponent,
    CheckoutComponent,
    MyAccountComponent,
    FaqComponent,
    AboutUsComponent,
    ErrorPageComponent,
    ProfileComponent,
    ForgetPasswordComponent
  ]
})
export class PagesModule { }
