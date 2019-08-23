import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { Appointment } from '../../../@core/models/appointment/appointment';
import { AppointmentRequest } from '../../../@core/models/appointment/appointment.request';
import { AppointmentError } from '../../../@core/models/appointment/appointment.error';
import { ToastService } from '../../../@core/utils/toast.service';
import { AppointmentClient } from '../../../@core/network/appointment-client.service';

@Component({
  selector: 'edit-appointment',  
  templateUrl: './edit.component.html',
})
export class EditAppointmentComponent implements OnInit {    
  appointment: Appointment = new Appointment();
  appointmentRequest: AppointmentRequest = new AppointmentRequest();
  appointmentError: AppointmentError = new AppointmentError();
  showProgress: boolean = false;
  showProgressButton: boolean = false;  
  appointmentStatusList: Array<string> = ['pending', 'accepted', 'ongoing', 'complete', 'cancelled', 'rejected'];
  
  constructor(private client: AppointmentClient, private route: ActivatedRoute, private router: Router, private toastService: ToastService) {    
  }  
  
  ngOnInit() {        
    this.getAppointment();
  }   
  
  getAppointment() {
    this.showProgress = true;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.client.show(params.get('id')))
    ).subscribe(
      (response) => {
        this.showProgress = false;
        this.appointment = response;
        this.appointmentRequest.date = this.appointment.date;
        this.appointmentRequest.time_from = this.appointment.time_from;        
        this.appointmentRequest.time_to = this.appointment.time_to;
        this.appointmentRequest.status = this.appointment.status;        
      }
    );
  }  

  updateAppointment() {
    this.showProgressButton = true;

    const formData: FormData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('date', String(this.appointmentRequest.date));
    formData.append('time_from', String(this.appointmentRequest.time_from).substr(0,5)); // remove seconds
    formData.append('time_to', String(this.appointmentRequest.time_to).substr(0,5)); // remove seconds
    formData.append('status', String(this.appointmentRequest.status));
    
    this.client.update(this.appointment.id, formData).subscribe(
      res => {
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.SUCCESS, 'Updated', 'Appointment updated successfully!');
        this.back();
      },
      err => {          
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.DANGER, 'Failed', err.error.message);
        if(err.error.errors) {
          if(err.error.errors.date) {
            this.appointmentError.date = err.error.errors.date;
          }
          if(err.error.errors.time_from) {
            this.appointmentError.time_from = err.error.errors.time_from;
          }
          if(err.error.errors.time_to) {
            this.appointmentError.time_to = err.error.errors.time_to;
          }
          if(err.error.errors.status) {
            this.appointmentError.status = err.error.errors.status;
          }
        }
      }
    );
  }
  
  back() {
    this.router.navigate(['/pages/appointments/list']);
  }  

  goToUser() {
    this.router.navigate(['/pages/users/edit', this.appointment.user_id]);
  }

  goToProvider() {
    this.router.navigate(['/pages/providers/edit', this.appointment.provider_id]);
  }
}
