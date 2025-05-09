import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';

import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogColumnComponent } from './blog-column/blog-column.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { SharedModule } from './../shared/shared.module';
import { PopupComponent } from './popup/popup.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    BlogDetailsComponent,
    BlogColumnComponent,
    BlogListComponent,
    PopupComponent
  ]
})
export class BlogModule { }
