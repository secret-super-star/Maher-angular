import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { Category } from '../../../@core/models/category/category';
import { CategoryRequest } from '../../../@core/models/category/category.request';
import { CategoryError } from '../../../@core/models/category/category.error';
import { ToastService } from '../../../@core/utils/toast.service';
import { CategoryClient } from '../../../@core/network/category-client.service';

@Component({
  selector: 'edit-category',  
  templateUrl: './edit.component.html',
})
export class EditCategoryComponent implements OnInit {
  primaryCategories: Array<Category> = [];
  category: Category = new Category();
  categoryRequest: CategoryRequest = new CategoryRequest();
  categoryError: CategoryError = new CategoryError();  
  showProgress: boolean = false;
  showProgressButton: boolean = false;

  constructor(private client: CategoryClient, private route: ActivatedRoute, private router: Router,
    private toastService: ToastService) {    
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.client.allPrimary().subscribe(
      (response) => { 
        this.primaryCategories = response;
        this.getCategory();
      }
    );
  }

  getCategory() {
    this.showProgress = true;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.client.show(params.get('id')))
    ).subscribe(
      (response) => {
        this.showProgress = false;
        this.category = response;
        this.categoryRequest.title = this.category.title;        
        this.categoryRequest.parent_id = this.category.parent_id;        
      }
    );
  }

  updateCategory() {
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
    formData.append('_method', 'PUT');

    this.client.update(this.category.id, formData).subscribe(
      res => {
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.SUCCESS, 'Updated', 'Category updated successfully!');
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
