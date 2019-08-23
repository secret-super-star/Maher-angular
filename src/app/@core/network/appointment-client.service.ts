import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Constants } from '../models/constants.model';
import { BaseClient } from './base-client.service';
import { AppointmentListResponse } from '../models/appointment/appointment-list-response';
import { Appointment } from '../models/appointment/appointment';

@Injectable()
export class AppointmentClient extends BaseClient {
    
    public static readonly BASE_ENDPOINT = Constants.API_BASE_URL + '/appointments';    
    
    public list(): Observable<AppointmentListResponse> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<AppointmentListResponse>(AppointmentClient.BASE_ENDPOINT, {headers: this.getHeaders(token)});
        }));
    }

    public show(id: string): Observable<Appointment> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<Appointment>(AppointmentClient.BASE_ENDPOINT + '/' + id, {headers: this.getHeaders(token)});
        }));
    }    

    public update(id, formData: FormData): Observable<Appointment> {
        formData.append('_method', 'PUT');
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<Appointment>(AppointmentClient.BASE_ENDPOINT + '/' + id, formData, {headers: this.getHeaders(token, false)});
        }));
    }

    public delete(id): Observable<any> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.delete<any>(AppointmentClient.BASE_ENDPOINT + '/' + id, {headers: this.getHeaders(token)});
        }));
    } 

}