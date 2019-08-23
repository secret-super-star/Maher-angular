import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { switchMap } from 'rxjs/operators';
import { Constants } from '../models/constants.model';
import { BaseClient } from './base-client.service';
import { Setting } from '../models/setting/setting';

@Injectable()
export class SettingClient extends BaseClient {
    
    public static readonly BASE_ENDPOINT = Constants.API_BASE_URL + '/settings';    
    
    public list(): Observable<Array<Setting>> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<Array<Setting>>(SettingClient.BASE_ENDPOINT, {headers: this.getHeaders(token)});
        }));
    }

    public store(formData: FormData): Observable<any> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<any>(SettingClient.BASE_ENDPOINT, formData, {headers: this.getHeaders(token, false)});
        }));
    }


}