import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlansComponent } from './component';
import { ListPlanComponent } from './list/list.component';
import { EditPlanComponent } from './edit/edit.component';

const routes: Routes = [{
    path: '',
    component: PlansComponent,
    children: [
        {
            path: 'list',
            component: ListPlanComponent,
        },
        {
            path: 'edit/:id',
            component: EditPlanComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlansRoutingModule { }

export const routedComponents = [
    PlansComponent,
    ListPlanComponent,
    EditPlanComponent
];
