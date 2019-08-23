import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NbAuthService } from '@nebular/auth';
import { ListDataSource } from '../../../@core/network/list-data-source';
import { Router } from '@angular/router';
import { ToastService } from '../../../@core/utils/toast.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ProviderClient } from '../../../@core/network/provider-client.service';
import { Constants } from '../../../@core/models/constants.model';

@Component({
    selector: 'list-provider',
    templateUrl: './list.component.html',
    styles: [`
    nb-card {
        transform: translate3d(0, 0, 0);
    }
    `],
})
export class ListProviderComponent {
    loading = false;
    exportLink = Constants.API_BASE_URL + "/download/provider";
    
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
                title: 'Email',
                type: 'string',
                filter: true,
                editable: false,                
                valuePrepareFunction: (user) => {
                    return user.email;
                }
            },
            is_verified: {
                title: 'Verified?',
                type: 'boolean',
                filter: {
                    type: 'checkbox',
                    config: {
                      true: 'Yes',
                      false: 'No',
                      resetText: 'clear',
                    },
                },
                editable: false
            },
            primary_category: {
                title: 'Primary Category',
                type: 'string',
                filter: false,
                editable: false,
                valuePrepareFunction: (primary_category) => {
                    return primary_category ? primary_category.title : '';
                }
            }
        },
        actions: {
            position: 'right',
            add: false
        },
        mode: 'external',
        hideSubHeader: false,
        pager: {
            perPage: 15
        }
    };        

    source: ListDataSource;
    
    constructor(private client: ProviderClient, private http: HttpClient, private authService: NbAuthService, private router: Router,
        private toastService: ToastService) {
        this.source = new ListDataSource(this.http, this.authService, ProviderClient.BASE_ENDPOINT);        
    }
    
    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {                
            this.delete(event);            
        }
    }

    edit(event) {        
        this.router.navigate(['/pages/providers/edit', event.data.id]);
    }

    delete(event) {
        this.loading = true;
        this.client.delete(event.data.id).subscribe(
            res => {              
                this.loading = false;
                this.toastService.showToast(NbToastStatus.SUCCESS, 'Deleted', 'Provider deleted successfully!');                              
                this.source.remove(event.data);
            },
            err => {              
              this.loading = false;
              this.toastService.showToast(NbToastStatus.DANGER, 'Failed', err.error.message ? err.error.message : 'Unable to delete Provider');              
            }
          );
    }
}
