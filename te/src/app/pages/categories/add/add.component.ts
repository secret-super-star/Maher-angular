import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { Category } from '../../../@core/models/category/category';
import { CategoryRequest } from '../../../@core/models/category/category.request';
import { CategoryError } from '../../../@core/models/category/category.error';
import { ToastService } from '../../../@core/utils/toast.service';
import { CategoryClient } from '../../../@core/network/category-client.service';

@Component({
  selector: 'add-category',  
  templateUrl: './add.component.html',
})
export class AddCategoryComponent implements OnInit {  
  category: Category = new Category();
  primaryCategories: Array<Category> = [];
  categoryRequest: CategoryRequest = new CategoryRequest();
  categoryError: CategoryError = new CategoryError();
  showProgressButton: boolean = false;  
  
  constructor(private client: CategoryClient, private route: ActivatedRoute, private router: Router,
    private toastService: ToastService) {}

    ngOnInit() {
      this.getCategories();
    }

    getCategories() {
      this.client.allPrimary().subscribe(
        (response) => { 
          this.primaryCategories = response;
        }
      );
    }
    
    addCategory() {
      this.showProgressButton = true;
      const formData: FormData = new FormData();
      formData.append('title', this.categoryRequest.title);
      if(this.categoryRequest.parent_id) {
        formData.append('parent_id', this.categoryRequest.parent_id);
      }
      if(this.categoryRequest.image) {
        formData.append('image', this.categoryRequest.image);
      }
      if(this.categoryRequest.secondary_image) {
        formData.append('secondary_image', this.categoryRequest.secondary_image);
      }          
      
      this.client.store(formData).subscribe(
        res => {
          this.showProgressButton = false;
          this.toastService.showToast(NbToastStatus.SUCCESS, 'Created', 'Category created successfully!');
          this.back();
        },
        err => {          
          this.showProgressButton = false;
          this.toastService.showToast(NbToastStatus.DANGER, 'Failed', err.error.message);
          if(err.error.errors) {
            if(err.error.errors.title) {
              this.categoryError.title = err.error.errors.title;
            }
            if(err.error.errors.image) {
              this.categoryError.image = err.error.errors.image;
            }
            if(err.error.errors.parent_id) {
              this.categoryError.parent_id = err.error.errors.parent_id;
            }
          }
        }
      );
    }
    
    back() {
      this.router.navigate(['/pages/categories/list']);
    }

    onFileChanged(event) {
      const file = event.target.files[0];
      this.categoryRequest.image = file;
    }

    onSecondaryFileChanged(event) {
      const file = event.target.files[0];
      this.categoryRequest.secondary_image = file;
    }
  }
  