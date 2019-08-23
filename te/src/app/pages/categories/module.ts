import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { CategoriesRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    ThemeModule,
    CategoriesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    
  ],
})
export class CategoriesModule { }
