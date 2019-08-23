import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NbAuthService } from '@nebular/auth';
import { ListDataSource } from '../../../@core/network/list-data-source';
import { Router } from '@angular/router';
import { ToastService } from '../../../@core/utils/toast.service';
import { ReviewClient } from '../../../@core/network/review-client.service';
import { Constants } from '../../../@core/models/constants.model';

@Component({
    selector: 'list-review',
    templateUrl: './list.component.html',
    styles: [`
    nb-card {
        transform: translate3d(0, 0, 0);
    }
    `],
})
export class ListReviewComponent {
    loading = false;
    exportLink = Constants.API_BASE_URL + "/download/review";
    
    settings = {
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: false,
        },
        columns: {            
            user: {
                title: 'User',
                type: 'string',
                filter: true,
                editable: false,                
                valuePrepareFunction: (user) => {
                    return user.email;
                }
            },
            provider: {
                title: 'Provider',
                type: 'string',
                filter: true,
                editable: false,                
                valuePrepareFunction: (provider) => {
                    return provider.user.email;
                }
            },
            created_at: {
                title: 'Review Date',
                type: 'string',
                filter: false,
                editable: false
            },
            
            
        },
        actions: {
            position: 'right',
            add: false,
            delete: true
        },
        mode: 'external',
        hideSubHeader: false,
        pager: {
            perPage: 15
        }
    };        

    source: ListDataSource;
    
    constructor(private client: ReviewClient, private http: HttpClient, private authService: NbAuthService, private router: Router,
        private toastService: ToastService) {
        this.source = new ListDataSource(this.http, this.authService, ReviewClient.BASE_ENDPOINT);        
    }        

    edit(event) {        
        this.router.navigate(['/pages/reviews/edit', event.data.id]);
    }    
}
