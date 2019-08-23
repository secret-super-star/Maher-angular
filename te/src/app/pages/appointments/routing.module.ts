import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentsComponent } from './component';
import { ListAppointmentComponent } from './list/list.component';
import { EditAppointmentComponent } from './edit/edit.component';

const routes: Routes = [{
    path: '',
    component: AppointmentsComponent,
    children: [        
        {
            path: 'list',
            component: ListAppointmentComponent,
        },
        {
            path: 'edit/:id',
            component: EditAppointmentComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppointmentsRoutingModule { }

export const routedComponents = [
    AppointmentsComponent,    
    ListAppointmentComponent,
    EditAppointmentComponent
];
