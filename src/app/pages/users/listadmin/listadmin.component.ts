
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NbAuthService } from '@nebular/auth';
import { ListDataSource } from '../../../@core/network/list-data-source';
import { Router } from '@angular/router';
import { ToastService } from '../../../@core/utils/toast.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { UserClient } from '../../../@core/network/user-client.service';
import { Constants } from '../../../@core/models/constants.model';

@Component({
  selector: 'ngx-listadmin',
  templateUrl: './listadmin.component.html',
  styles: [`
    nb-card {
        transform: translate3d(0, 0, 0);
    }
    `],
})
export class ListAdminComponent {
  loading = false;
  exportLink = Constants.API_BASE_URL + "/download/admin";
  
  settings = {
    
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
          email: {
              title: 'Email',
              type: 'string',
              filter: true,
              editable: false,                
          },
          name: {
              title: 'Name',
              type: 'string',
              filter: true,
              editable: false,                
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
  
  constructor(private client: UserClient, private http: HttpClient, private authService: NbAuthService, private router: Router,
      private toastService: ToastService) {
      this.source = new ListDataSource(this.http, this.authService, UserClient.ADMIN_ENDPOINT);        
  }
  
  onDeleteConfirm(event): void {
      if (window.confirm('Are you sure you want to delete?')) {                
          this.delete(event);            
      }
  }

  edit(event) {        
      this.router.navigate(['/pages/users/editadmin', event.data.id]);
  }

  delete(event) {
      if(event.data.id == 1) {
          this.toastService.showToast(NbToastStatus.DANGER, 'Failed', 'Cannot delete main administrator');              
          return;
      }
      this.loading = true;        
      this.client.deleteAdmin(event.data.id).subscribe(
          res => {              
              this.loading = false;
              this.toastService.showToast(NbToastStatus.SUCCESS, 'Deleted', 'Admin deleted successfully!');                              
              this.source.remove(event.data);
          },
          err => {              
            this.loading = false;
            this.toastService.showToast(NbToastStatus.DANGER, 'Failed', err.error.message ? err.error.message : 'Unable to delete admin');              
          }
        );
  }
}

