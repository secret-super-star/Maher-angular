import { Component, OnInit } from '@angular/core';
import { ListDataSource } from '../../../@core/network/list-data-source';
import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { ToastService } from '../../../@core/utils/toast.service';
import { Router } from '@angular/router';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { CountryClient } from '../../../@core/network/country-client.service';

@Component({
  selector: 'ngx-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

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
        country: {
            title: 'Country',
            type: 'string',
            filter: true,
            editable: false,                
        },
        currency: {
            title: 'Currency',
            type: 'string',
            filter: true,
            editable: false,                
        },
        tax: {
            title: 'Tax',
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
constructor(private client: CountryClient, private http: HttpClient, private authService: NbAuthService, private router: Router,
  private toastService: ToastService) {
    console.log("ok")
  this.source = new ListDataSource(this.http, this.authService, CountryClient.BASE_ENDPOINT);   
  console.log(this.source);
}

  ngOnInit() {
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {                
        this.delete(event);            
    }
  }

  edit(event) {        
      this.router.navigate(['/pages/settings/country/edit', event.data.id]);
  }

  delete(event) {
      if(event.data.id == 1) {
          this.toastService.showToast(NbToastStatus.DANGER, 'Failed', 'Cannot delete administrator');              
          return;
      }
      this.loading = true;        
      this.client.delete(event.data.id).subscribe(
          res => {              
              this.loading = false;
              this.toastService.showToast(NbToastStatus.SUCCESS, 'Deleted', 'Country deleted successfully!');                              
              this.source.remove(event.data);
          },
          err => {              
            this.loading = false;
            this.toastService.showToast(NbToastStatus.DANGER, 'Failed', err.error.message ? err.error.message : 'Unable to delete user');              
          }
        );
  }

}
