import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './component';
import { EditSettingComponent } from './edit/edit.component';
import { CountryComponent } from './country/country.component';
import { CountryAddComponent } from './country/country-add/country-add.component';
import { CountryEditComponent } from './country/country-edit/country-edit.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

const routes: Routes = [{
    path: '',
    component: SettingsComponent,
    children: [        
        {
            path: 'update',
            component: EditSettingComponent,
        },
        {
            path: 'country',
            component: CountryComponent,
        },
        {
            path: 'country/add',
            component: CountryAddComponent,
        },
        {
            path: 'country/edit/:id',
            component: CountryEditComponent,
        }
    ],
}];

@NgModule({
    imports: [ThemeModule,RouterModule.forChild(routes),Ng2SmartTableModule],
    exports: [RouterModule],
    declarations: [CountryComponent, CountryAddComponent, CountryEditComponent],
})
export class QuestionsRoutingModule { }

export const routedComponents = [
    SettingsComponent,    
    EditSettingComponent
];
