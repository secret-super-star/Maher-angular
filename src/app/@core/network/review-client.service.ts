import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Constants } from '../models/constants.model';
import { BaseClient } from './base-client.service';
import { ReviewListResponse } from '../models/review/review-list-response';
import { Review } from '../models/review/review';

@Injectable()
export class ReviewClient extends BaseClient {
    
    public static readonly BASE_ENDPOINT = Constants.API_BASE_URL + '/reviews';    
    
    public list(): Observable<ReviewListResponse> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<ReviewListResponse>(ReviewClient.BASE_ENDPOINT, {headers: this.getHeaders(token)});
        }));
    }

    public show(id: string): Observable<Review> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<Review>(ReviewClient.BASE_ENDPOINT + '/' + id, {headers: this.getHeaders(token)});
        }));
    }    

    public update(id, formData: FormData): Observable<Review> {
        formData.append('_method', 'PUT');
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<Review>(ReviewClient.BASE_ENDPOINT + '/' + id, formData, {headers: this.getHeaders(token, false)});
        }));
    }

    public delete(id): Observable<any> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.delete<any>(ReviewClient.BASE_ENDPOINT + '/' + id, {headers: this.getHeaders(token)});
        }));
    } 

}