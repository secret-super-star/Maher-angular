import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NbAuthService } from '@nebular/auth';
import { ListDataSource } from '../../../@core/network/list-data-source';
import { Router } from '@angular/router';
import { ToastService } from '../../../@core/utils/toast.service';
import { SupportClient } from '../../../@core/network/support-client.service';

@Component({
    selector: 'list-support',
    templateUrl: './list.component.html',
    styles: [`
    nb-card {
        transform: translate3d(0, 0, 0);
    }
    `],
})
export class ListSupportComponent {
    loading = false;
    
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
            name: {
                title: 'Name',
                type: 'string',
                filter: false,
                editable: false                
            },
            email: {
                title: 'Email',
                type: 'string',
                filter: false,
                editable: false                
            },
            message: {
                title: 'Message',
                type: 'string',
                filter: false,
                editable: false                
            }            
        },
        actions: {
            position: 'right',
            add: false,
            edit: false,
            delete: false
        },
        mode: 'external',
        hideSubHeader: false,
        pager: {
            perPage: 15
        }
    };        

    source: ListDataSource;
    
    constructor(private client: SupportClient, private http: HttpClient, private authService: NbAuthService, private router: Router,
        private toastService: ToastService) {
        this.source = new ListDataSource(this.http, this.authService, SupportClient.BASE_ENDPOINT);        
    }            
}
