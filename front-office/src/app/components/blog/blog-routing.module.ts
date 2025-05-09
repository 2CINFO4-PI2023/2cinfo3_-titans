import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogColumnComponent } from './blog-column/blog-column.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { PopupComponent } from './popup/popup.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BlogColumnComponent},
      { path: ':eventid', component: BlogDetailsComponent},
      { path: 'blog-list', component: BlogListComponent},
      { path: 'popup', component: PopupComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BlogRoutingModule { }
