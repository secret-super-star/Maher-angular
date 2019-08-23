import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Constants } from '../models/constants.model';
import { BaseClient } from './base-client.service';
import { PlanListResponse } from '../models/plan/plan-list-response';
import { Plan } from '../models/plan/plan';

@Injectable()
export class PlanClient extends BaseClient {
    
    public static readonly BASE_ENDPOINT = Constants.API_BASE_URL + '/plans';    
    
    public list(): Observable<PlanListResponse> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<PlanListResponse>(PlanClient.BASE_ENDPOINT, {headers: this.getHeaders(token)});
        }));
    }    

    public show(id: string): Observable<Plan> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<Plan>(PlanClient.BASE_ENDPOINT + '/' + id, {headers: this.getHeaders(token)});
        }));
    }

    public update(id, formData: FormData): Observable<Plan> {
        formData.append('_method', 'PUT');
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<Plan>(PlanClient.BASE_ENDPOINT + '/' + id, formData, {headers: this.getHeaders(token, false)});
        }));
    }
}