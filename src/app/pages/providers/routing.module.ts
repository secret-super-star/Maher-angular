import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersComponent } from './component';
import { ListProviderComponent } from './list/list.component';
import { EditProviderComponent } from './edit/edit.component';
import { AddProviderComponent } from './add/add.component';

const routes: Routes = [{
    path: '',
    component: ProvidersComponent,
    children: [        
        {
            path: 'list',
            component: ListProviderComponent,
        },
        {
            path: 'edit/:id',
            component: EditProviderComponent,
        },
        {
            path: 'add',
            component: AddProviderComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProvidersRoutingModule { }

export const routedComponents = [
    ProvidersComponent,    
    ListProviderComponent,
    EditProviderComponent,
    AddProviderComponent
];
