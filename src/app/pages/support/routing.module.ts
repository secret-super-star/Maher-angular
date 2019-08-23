import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportComponent } from './component';
import { ListSupportComponent } from './list/list.component';

const routes: Routes = [{
    path: '',
    component: SupportComponent,
    children: [        
        {
            path: 'list',
            component: ListSupportComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SupportRoutingModule { }

export const routedComponents = [
    SupportComponent,    
    ListSupportComponent
];
