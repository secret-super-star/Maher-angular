import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { Plan } from '../../../@core/models/plan/plan';
import { PlanRequest } from '../../../@core/models/plan/plan.request';
import { PlanError } from '../../../@core/models/plan/plan.error';
import { ToastService } from '../../../@core/utils/toast.service';
import { PlanClient } from '../../../@core/network/plan-client.service';

@Component({
  selector: 'edit-plan',  
  templateUrl: './edit.component.html',
})
export class EditPlanComponent implements OnInit {
  primaryCategories: Array<Plan> = [];
  plan: Plan = new Plan();
  planRequest: PlanRequest = new PlanRequest();
  planError: PlanError = new PlanError();  
  showProgress: boolean = false;
  showProgressButton: boolean = false;

  constructor(private client: PlanClient, private route: ActivatedRoute, private router: Router,
    private toastService: ToastService) {    
  }

  ngOnInit() {
    this.getPlan();
  }

  getPlan() {
    this.showProgress = true;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.client.show(params.get('id')))
    ).subscribe(
      (response) => {
        this.showProgress = false;
        this.plan = response;
        this.planRequest.name = this.plan.name;        
        this.planRequest.description = this.plan.description;        
        this.planRequest.price = this.plan.price;        
        this.planRequest.leads_per_day = String(this.plan.features[0].limit);
      }
    );
  }

  updatePlan() {
    this.showProgressButton = true;
    const formData: FormData = new FormData();
    formData.append('name', this.planRequest.name);
    formData.append('description', this.planRequest.description);
    formData.append('price', this.planRequest.price);
    formData.append('leads_per_day', this.planRequest.leads_per_day);
    formData.append('_method', 'PUT');

    this.client.update(this.plan.id, formData).subscribe(
      res => {
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.SUCCESS, 'Updated', 'Plan updated successfully!');
        this.back();
      },
      err => {        
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.DANGER, 'Failed', err.error.message);
        if(err.error.errors) {
          if(err.error.errors.title) {
            this.planError.name = err.error.errors.name;
          }
          if(err.error.errors.description) {
            this.planError.description = err.error.errors.description;
          }
          if(err.error.errors.price) {
            this.planError.price = err.error.errors.price;
          }
          if(err.error.errors.leads_per_day) {
            this.planError.leads_per_day = err.error.errors.leads_per_day;
          }
        }
      }
    );
  }

  back() {
    this.router.navigate(['/pages/plans/list']);
  }
}
