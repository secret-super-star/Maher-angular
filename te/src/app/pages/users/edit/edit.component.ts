import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { User } from '../../../@core/models/user/user';
import { UserRequest } from '../../../@core/models/user/user.request';
import { UserError } from '../../../@core/models/user/user.error';
import { ToastService } from '../../../@core/utils/toast.service';
import { UserClient } from '../../../@core/network/user-client.service';
import { Role } from '../../../@core/models/user/role';

@Component({
  selector: 'edit-user',  
  templateUrl: './edit.component.html',
})
export class EditUserComponent implements OnInit {

  user: User = new User();
  userRoles: Array<Role> = [];
  userRequest: UserRequest = new UserRequest();
  userError: UserError = new UserError();  
  showProgress: boolean = false;
  showProgressButton: boolean = false;

  constructor(private client: UserClient, private route: ActivatedRoute, private router: Router,
    private toastService: ToastService) {    
  }

  ngOnInit() {    
    this.getRoles();
  }

  getRoles() {
    this.client.roles().subscribe(
      (response) => { 
        this.userRoles = response;
        this.getUser();
      }
    );
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
        this.userRequest.name = this.user.name;
        this.userRequest.email = this.user.email;        
        this.userRequest.mobile_number = this.user.mobile_number;
        this.userRequest.role = this.user.roles[0].id;
        this.userRequest.active = this.user.active;
      }
    );
  }

  updateUser() {    
    this.showProgressButton = true;
    
    const formData: FormData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', this.userRequest.name);
    formData.append('email', this.userRequest.email);
    formData.append('mobile_number', this.userRequest.mobile_number);    
    formData.append('role', this.userRequest.role);
    formData.append('active', String(this.userRequest.active));

    if(this.userRequest.password) {
      formData.append('password', this.userRequest.password);
      formData.append('confirmed', this.userRequest.password);
    }

    if(this.userRequest.image) {
      formData.append('image', this.userRequest.image);
    }

    this.client.update(this.user.id, formData).subscribe(
      res => {
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.SUCCESS, 'Updated', 'User updated successfully!');
        this.back();
      },
      err => {        
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.DANGER, 'Failed', err.error.message);
        if(err.error.errors){
          if(err.error.errors.name) {
            this.userError.name = err.error.errors.name;
          }
          if(err.error.errors.image) {
            this.userError.image = err.error.errors.image;
          }
          if(err.error.errors.email) {
            this.userError.email = err.error.errors.email;
          }
          if(err.error.errors.mobile_number) {
            this.userError.mobile_number = err.error.errors.mobile_number;
          }
          if(err.error.errors.password) {
            this.userError.password = err.error.errors.password;
          }
          if(err.error.errors.role) {
            this.userError.role = err.error.errors.role;
          }
        }
      }
    );
  }

  back() {
    this.router.navigate(['/pages/users/list']);
  }

  compareRole(r1: Role, r2: Role): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  } 

  onIsActivedChange(value) {
    this.userRequest.active = value ? 1 : 0;
  }
}
