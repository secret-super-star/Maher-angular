import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { 
    path: 'pages', 
    loadChildren: 'app/pages/pages.module#PagesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#NgxAuthModule',
  },  
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
