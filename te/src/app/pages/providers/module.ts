import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ProvidersRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ProvidersRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    
  ],
})
export class ProvidersModule { }
