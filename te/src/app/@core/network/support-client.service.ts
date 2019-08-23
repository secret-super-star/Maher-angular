import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Constants } from '../models/constants.model';
import { BaseClient } from './base-client.service';
import { SupportListResponse } from '../models/support/support-list-response';

@Injectable()
export class SupportClient extends BaseClient {
    
    public static readonly BASE_ENDPOINT = Constants.API_BASE_URL + '/supports';    
    
    public list(): Observable<SupportListResponse> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<SupportListResponse>(SupportClient.BASE_ENDPOINT, {headers: this.getHeaders(token)});
        }));
    }    
}