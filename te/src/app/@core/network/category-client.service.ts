import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { switchMap } from 'rxjs/operators';
import { CategoryListResponse } from '../models/category/category-list-response';
import { Constants } from '../models/constants.model';
import { Category } from '../models/category/category';
import { BaseClient } from './base-client.service';

@Injectable()
export class CategoryClient extends BaseClient {    

    public getListEndpoint() {
        return Constants.API_BASE_URL + '/categories';
    }
    
    public list(): Observable<CategoryListResponse> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<CategoryListResponse>(Constants.API_BASE_URL + '/categories', {headers: this.getHeaders(token)});
        }));
    }

    public show(id: string): Observable<Category> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<Category>(Constants.API_BASE_URL + '/categories/' + id, {headers: this.getHeaders(token)});
        }));
    }

    public store(formData: FormData): Observable<Category> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<Category>(Constants.API_BASE_URL + '/categories', formData, {headers: this.getHeaders(token, false)});
        }));
    }

    public update(id, formData: FormData): Observable<Category> {
        formData.append('_method', 'PUT');
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<Category>(Constants.API_BASE_URL + '/categories/' + id, formData, {headers: this.getHeaders(token, false)});
        }));
    }

    public delete(id): Observable<any> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.delete<any>(Constants.API_BASE_URL + '/categories/' + id, {headers: this.getHeaders(token)});
        }));
    } 

    public allPrimary(): Observable<Array<Category>> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<Array<Category>>(Constants.API_BASE_URL + '/categories/primary', {headers: this.getHeaders(token)});
        }));
    }

    public allSubcategories(id): Observable<Array<Category>> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<Array<Category>>(Constants.API_BASE_URL + '/categories/' + id + '/subcategories', {headers: this.getHeaders(token)});
        }));
    }

}