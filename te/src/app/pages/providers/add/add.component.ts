import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { Provider } from '../../../@core/models/provider/provider';
import { ProviderRequest } from '../../../@core/models/provider/provider.request';
import { ProviderError } from '../../../@core/models/provider/provider.error';
import { ToastService } from '../../../@core/utils/toast.service';
import { ProviderClient } from '../../../@core/network/provider-client.service';
import { CategoryClient } from '../../../@core/network/category-client.service';
import { Category } from '../../../@core/models/category/category';
import { PlanClient } from '../../../@core/network/plan-client.service';
import { Plan } from '../../../@core/models/plan/plan';

@Component({
  selector: 'add-provider',  
  templateUrl: './add.component.html',
})
export class AddProviderComponent implements OnInit {  
  providerCategories: Array<Category> = [];
  providerSubCategories: Array<Category> = [];
  plans: Array<Plan>;
  provider: Provider = new Provider();
  providerRequest: ProviderRequest = new ProviderRequest();
  providerError: ProviderError = new ProviderError();
  showProgress: boolean = false;
  showProgressButton: boolean = false;  
  
  constructor(private client: ProviderClient, private route: ActivatedRoute, private router: Router, private toastService: ToastService, private categoryClient: CategoryClient, private planClient: PlanClient) {
    
  }  
  
  ngOnInit() {    
    this.getCategories();
  }
  
  getCategories() {
    this.categoryClient.allPrimary().subscribe(
      (response) => { 
        this.providerCategories = response;
        this.getPlans();
      }
    );
  }

  getSubcategories(id) {
    this.showProgress = true;
    this.categoryClient.allSubcategories(id).subscribe(
      (response) => { 
        this.showProgress = false;
        this.providerSubCategories = response;   
      }
    );
  }

  getPlans() {
    this.showProgress = true;
    this.planClient.list().subscribe(
      (response) => { 
        this.showProgress = false;
        this.plans = response.data;
      }
    );
  }

 
  
  addProvider() {
    this.showProgressButton = true;

    const formData: FormData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('is_verified', String(this.providerRequest.is_verified));
    formData.append('primary_category_id', this.providerRequest.primary_category_id);
    formData.append('about', this.providerRequest.about);
    formData.append('price', String(this.providerRequest.price));
    formData.append('price_type', this.providerRequest.price_type);
    formData.append('address', this.providerRequest.address);
    formData.append('latitude', String(this.providerRequest.latitude));
    formData.append('longitude', String(this.providerRequest.longitude));
    for(let i=0; i<this.providerRequest.sub_categories.length; i++) {
      formData.append('sub_categories[]', this.providerRequest.sub_categories[i].id);
    }    
    formData.append('plan_id', String(this.providerRequest.plan_id));

    if(this.providerRequest.image) {
      formData.append('image', this.providerRequest.image);
    }    

    if(this.providerRequest.document) {
      formData.append('image', this.providerRequest.document);
    }          
    
    formData.append('_method', 'PUT');
    this.client.store(formData).subscribe(
      res => {
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.SUCCESS, 'Created', 'Provider created successfully!');
        this.back();
      },
      err => {          
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.DANGER, 'Failed', err.error.message);
        if(err.error.errors) {
          if(err.error.errors.is_verified) {
            this.providerError.is_verified = err.error.errors.is_verified;
          }          
          if(err.error.errors.primary_category_id) {
            this.providerError.primary_category_id = err.error.errors.primary_category_id;
          }          
          if(err.error.errors.about) {
            this.providerError.about = err.error.errors.about;
          }          
          if(err.error.errors.price) {
            this.providerError.price = err.error.errors.price;
          }          
          if(err.error.errors.price_type) {
            this.providerError.price_type = err.error.errors.price_type;
          }          
          if(err.error.errors.address) {
            this.providerError.address = err.error.errors.address;
          }          
          if(err.error.errors.latitude) {
            this.providerError.latitude = err.error.errors.latitude;
          }          
          if(err.error.errors.longitude) {
            this.providerError.longitude = err.error.errors.longitude;
          }          
        }
      }
    );
  }
  
  back() {
    this.router.navigate(['/pages/providers/list']);
  }

  compareSubcategory(obj1: Category, obj2: Category): boolean {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  } 

  onPrimaryCategoryChange(value) {
    this.getSubcategories(value);
  }

  onIsVerifiedChange(value) {
    this.providerRequest.is_verified = value ? 1 : 0;
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    this.providerRequest.image = file;
  }
}
