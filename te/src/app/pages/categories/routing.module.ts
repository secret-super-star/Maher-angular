import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './component';
import { AddCategoryComponent } from './add/add.component';
import { ListCategoryComponent } from './list/list.component';
import { EditCategoryComponent } from './edit/edit.component';

const routes: Routes = [{
    path: '',
    component: CategoriesComponent,
    children: [
        {
            path: 'add',
            component: AddCategoryComponent,
        },
        {
            path: 'list',
            component: ListCategoryComponent,
        },
        {
            path: 'edit/:id',
            component: EditCategoryComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoriesRoutingModule { }

export const routedComponents = [
    CategoriesComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    EditCategoryComponent
];
