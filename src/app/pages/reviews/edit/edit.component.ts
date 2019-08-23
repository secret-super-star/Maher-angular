import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { Review } from '../../../@core/models/review/review';
import { ReviewRequest } from '../../../@core/models/review/review.request';
import { ReviewError } from '../../../@core/models/review/review.error';
import { ToastService } from '../../../@core/utils/toast.service';
import { ReviewClient } from '../../../@core/network/review-client.service';

@Component({
  selector: 'edit-review',  
  templateUrl: './edit.component.html',
})
export class EditReviewComponent implements OnInit {    
  review: Review = new Review();
  reviewRequest: ReviewRequest = new ReviewRequest();
  reviewError: ReviewError = new ReviewError();
  showProgress: boolean = false;
  showProgressButton: boolean = false;  
  
  constructor(private client: ReviewClient, private route: ActivatedRoute, private router: Router, private toastService: ToastService) {    
  }  
  
  ngOnInit() {        
    this.getReview();
  }   /*
    id: string;    
    rating: number;
    user_id: string;
    provider_id: string;    
    review: string;
  */
  
  getReview() {
    this.showProgress = true;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.client.show(params.get('id')))
    ).subscribe(
      (response) => {
        this.showProgress = false;
        this.review = response;
        this.reviewRequest.rating = this.review.rating;
        this.reviewRequest.review = this.review.review;
        this.reviewRequest.active = this.review.active;
      }
    );
  }  

  updateReview() {
    this.showProgressButton = true;

    const formData: FormData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('rating', String(this.reviewRequest.rating));
    formData.append('review', String(this.reviewRequest.review));
    formData.append('active', String(this.reviewRequest.active));
    
    this.client.update(this.review.id, formData).subscribe(
      res => {
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.SUCCESS, 'Updated', 'Review updated successfully!');
        this.back();
      },
      err => {          
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.DANGER, 'Failed', err.error.message);
        if(err.error.errors) {
          if(err.error.errors.rating) {
            this.reviewError.rating = err.error.errors.rating;
          }
          if(err.error.errors.review) {
            this.reviewError.review = err.error.errors.review;
          }
        }
      }
    );
  }
  
  back() {
    this.router.navigate(['/pages/reviews/list']);
  }  

  goToUser() {
    this.router.navigate(['/pages/users/edit', this.review.user_id]);
  }

  goToProvider() {
    this.router.navigate(['/pages/providers/edit', this.review.provider_id]);
  }
  onIsActivedChange(value) {
    this.reviewRequest.active = value ? 1 : 0;
  }
}
