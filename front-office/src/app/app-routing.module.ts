import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/shared/services/auth.garde';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

      {
       path: 'home',
       loadChildren: () => import('./components/shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)

      },
      {
        path: 'events',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule)

      },
      {
        path: 'auth',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./components/pages/auth.module').then(m => m.AuthModule)

      },

  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
