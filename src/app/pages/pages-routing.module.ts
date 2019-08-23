import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {ECommerceComponent} from './e-commerce/e-commerce.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: ECommerceComponent,
  }, {
    path: 'categories',
    loadChildren: './categories/module#CategoriesModule',
  }, {
    path: 'users',
    loadChildren: './users/module#UsersModule',
  }, {
    path: 'providers',
    loadChildren: './providers/module#ProvidersModule',
  }, {
    path: 'reviews',
    loadChildren: './reviews/module#ReviewsModule',
  }, {
    path: 'appointments',
    loadChildren: './appointments/module#AppointmentsModule',
  }, {
    path: 'plans',
    loadChildren: './plans/module#PlansModule',
  }, {
    path: 'settings',
    loadChildren: './settings/module#SettingsModule',
  }, {
    path: 'support',
    loadChildren: './support/module#SupportModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
