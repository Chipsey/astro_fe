import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'landing-page',
        loadChildren: () =>
          import('./pages/landing-page/landing-page.module').then(
            (m) => m.LandingPageModule
          ),
      },
    ],
  },
  {
    path: 'auth', // Auth Layout for authentication pages
    component: AuthLayoutComponent,
    children: [
      // {
      //   path: 'login',
      //   loadChildren: () =>
      //     import('./pages/auth/auth.module').then((m) => m.AuthModule),
      // },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
