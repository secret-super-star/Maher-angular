import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Constants } from '../models/constants.model';
import { BaseClient } from './base-client.service';
import { CountryListResponse } from '../models/country/country-list-response';
import { Country } from '../models/country/country';

@Injectable()
export class CountryClient extends BaseClient {    
    public static readonly BASE_ENDPOINT = Constants.API_BASE_URL + '/country';
    
    public list(): Observable<CountryListResponse> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<CountryListResponse>(CountryClient.BASE_ENDPOINT, {headers: this.getHeaders(token)});
        }));
    }

    public show(id: string): Observable<Country> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<Country>(CountryClient.BASE_ENDPOINT + '/' + id, {headers: this.getHeaders(token)});
        }));
    }

    public store(formData: FormData): Observable<Country> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<Country>(CountryClient.BASE_ENDPOINT+'/add', formData, {headers: this.getHeaders(token, false)});
        }));
    }

    public update(id, formData: FormData): Observable<Country> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<Country>(CountryClient.BASE_ENDPOINT + '/' + id + '/edit', formData, {headers: this.getHeaders(token, false)});
        }));
    }

    public delete(id): Observable<any> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<any>(CountryClient.BASE_ENDPOINT + '/' + id + '/delete', {headers: this.getHeaders(token)});
        }));
    } 

}