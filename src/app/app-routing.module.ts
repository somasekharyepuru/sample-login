import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then( module => module.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then( module => module.RegisterModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./modules/user-dashboard/user-dashboard.module').then( module => module.UserDashboardModule),
    data: {
      role:  'USER'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./modules/admin-dashboard/admin-dashboard.module').then( module => module.AdminDashboardModule),
    data: {
      role: 'ADMIN'
    },
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
