import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { switchMap } from 'rxjs/operators';
import { ProviderListResponse } from '../models/provider/provider-list-response';
import { Constants } from '../models/constants.model';
import { Provider } from '../models/provider/provider';
import { BaseClient } from './base-client.service';

@Injectable()
export class ProviderClient extends BaseClient {
    
    public static readonly BASE_ENDPOINT = Constants.API_BASE_URL + '/providers';    
    
    public list(): Observable<ProviderListResponse> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<ProviderListResponse>(ProviderClient.BASE_ENDPOINT, {headers: this.getHeaders(token)});
        }));
    }

    public show(id: string): Observable<Provider> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<Provider>(ProviderClient.BASE_ENDPOINT + '/' + id, {headers: this.getHeaders(token)});
        }));
    }    

    public update(id, formData: FormData): Observable<Provider> {
        formData.append('_method', 'PUT');
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<Provider>(ProviderClient.BASE_ENDPOINT + '/' + id, formData, {headers: this.getHeaders(token, false)});
        }));
    }

    public store(formData: FormData): Observable<Provider> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<Provider>(ProviderClient.BASE_ENDPOINT, formData, {headers: this.getHeaders(token, false)});
        }));
    }

    public delete(id): Observable<any> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.delete<any>(ProviderClient.BASE_ENDPOINT + '/' +  id, {headers: this.getHeaders(token)});
        }));
    } 
}