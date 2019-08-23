import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {ECommerceModule} from './e-commerce/e-commerce.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {httpInterceptorProviders} from './http-interceptors';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ECommerceModule,
    ThemeModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    httpInterceptorProviders,
  ],
})
export class PagesModule {
}
