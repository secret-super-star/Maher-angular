import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewsComponent } from './component';
import { ListReviewComponent } from './list/list.component';
import { EditReviewComponent } from './edit/edit.component';

const routes: Routes = [{
    path: '',
    component: ReviewsComponent,
    children: [        
        {
            path: 'list',
            component: ListReviewComponent,
        },
        {
            path: 'edit/:id',
            component: EditReviewComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReviewsRoutingModule { }

export const routedComponents = [
    ReviewsComponent,    
    ListReviewComponent,
    EditReviewComponent
];
