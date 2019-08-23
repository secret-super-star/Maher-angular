import { Component, OnInit } from '@angular/core';
import { Country } from '../../../../@core/models/country/country';
import { CountryRequest } from '../../../../@core/models/country/country.request'; 
import { CountryClient } from '../../../../@core/network/country-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../@core/utils/toast.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.scss']
})
export class CountryAddComponent implements OnInit {

  user: Country = new Country();
  userRequest: CountryRequest = new CountryRequest();
  //userError: CountryError = new CountryError();   
  showProgress: boolean = false;
  showProgressButton: boolean = false;

  constructor(private client: CountryClient, private route: ActivatedRoute, private router: Router,
    private toastService: ToastService) {    
  }

  ngOnInit() {     
  }

  addUser() {    
    this.showProgressButton = true;
    
    const formData: FormData = new FormData();    
    formData.append('country', this.userRequest.country);
    formData.append('tax', this.userRequest.tax);
    formData.append('currency', this.userRequest.currency);          

    this.client.store(formData).subscribe(
      res => {
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.SUCCESS, 'Created', 'Country added successfully!');
        this.back();
      },
      err => {     
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.DANGER, 'Failed', err.error.message);
        if(err.error.errors){          
          /*if(err.error.errors.country) {
            this.userError.country = err.error.errors.country;
          }
          if(err.error.errors.currency) {
            this.userError.currency = err.error.errors.currency;
          }
          if(err.error.errors.tax) {
            this.userError.tax = err.error.errors.tax;
          }*/
        }
      }
    );
  }

  back() {
    this.router.navigate(['/pages/settings/country']);
  }

}
