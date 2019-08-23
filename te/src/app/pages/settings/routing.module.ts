import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './component';
import { EditSettingComponent } from './edit/edit.component';

const routes: Routes = [{
    path: '',
    component: SettingsComponent,
    children: [        
        {
            path: 'update',
            component: EditSettingComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuestionsRoutingModule { }

export const routedComponents = [
    SettingsComponent,    
    EditSettingComponent
];
