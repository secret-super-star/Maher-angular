import { Component, OnInit } from '@angular/core';
import { Country } from '../../../../@core/models/country/country';
import { CountryRequest } from '../../../../@core/models/country/country.request'; 
import { CountryClient } from '../../../../@core/network/country-client.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ToastService } from '../../../../@core/utils/toast.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {

  user: Country = new Country();
  userRequest: CountryRequest = new CountryRequest();
  //userError: CountryError = new CountryError();   
  showProgress: boolean = false;
  showProgressButton: boolean = false;

  constructor(private client: CountryClient, private route: ActivatedRoute, private router: Router,
    private toastService: ToastService) {    
  }

  ngOnInit() { 
    this.getUser();    
  }

  getUser() {
    this.showProgress = true;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.client.show(params.get('id')))
    ).subscribe(
      (response) => {
        this.showProgress = false;
        this.user = response;
        this.userRequest.country = this.user.country;
        this.userRequest.currency = this.user.currency;        
        this.userRequest.tax = this.user.tax;
      }
    );
  }

  addUser() {    
    this.showProgressButton = true;
    
    const formData: FormData = new FormData();    
    formData.append('country', this.userRequest.country);
    formData.append('tax', this.userRequest.tax);
    formData.append('currency', this.userRequest.currency);          

    this.client.update(this.user.id,formData).subscribe(
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
