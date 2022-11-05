import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { UserRoleGuard } from './core/guards/user-role.guard';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { ProfileComponent } from './shared/components/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/client/theaters' },
  {
    path: 'admin',
    canActivate: [UserRoleGuard],
    canLoad: [UserRoleGuard],
    data: { allowedRole: 'admin' },
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'management',
    canActivate: [UserRoleGuard],
    canLoad: [UserRoleGuard],
    data: { allowedRole: 'manager' },
    loadChildren: () =>
      import('./modules/management/management.module').then(
        (m) => m.ManagementModule
      ),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./modules/client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    canActivate: [LoggedInGuard],
    component: ProfileComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
