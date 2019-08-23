import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Constants } from '../models/constants.model';
import { BaseClient } from './base-client.service';
import { UserListResponse } from '../models/user/user-list-response';
import { User } from '../models/user/user';
import { Role } from '../models/user/role';

@Injectable()
export class UserClient extends BaseClient {    
    public static readonly BASE_ENDPOINT = Constants.API_BASE_URL + '/users';
    public static readonly ADMIN_ENDPOINT = Constants.API_BASE_URL + '/users/admins';
    public static readonly COUNTRY_ENDPOINT = Constants.API_BASE_URL + '/country';
    
    public list(): Observable<UserListResponse> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<UserListResponse>(UserClient.BASE_ENDPOINT, {headers: this.getHeaders(token)});
        }));
    }

    public show(id: string): Observable<User> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<User>(UserClient.BASE_ENDPOINT + '/' + id, {headers: this.getHeaders(token)});
        }));
    }

    public store(formData: FormData): Observable<User> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<User>(UserClient.BASE_ENDPOINT, formData, {headers: this.getHeaders(token, false)});
        }));
    }

    public update(id, formData: FormData): Observable<User> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.post<User>(UserClient.BASE_ENDPOINT + '/' + id, formData, {headers: this.getHeaders(token, false)});
        }));
    }

    public delete(id): Observable<any> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.delete<any>(UserClient.BASE_ENDPOINT + '/' + id, {headers: this.getHeaders(token)});
        }));
    }

    public deleteAdmin(id): Observable<any> {        
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.delete<any>(UserClient.BASE_ENDPOINT + '/deleteadmin/' + id, {headers: this.getHeaders(token)});
        }));
    }
    
    
    public roles(): Observable<Array<Role>> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<Array<Role>>(UserClient.BASE_ENDPOINT + '/roles', {headers: this.getHeaders(token)});
        }));
    }

    public country(): Observable<Array<Role>> {
        return this.authService.getToken().pipe(switchMap((token) => {            
            return this.http.get<Array<Role>>(UserClient.COUNTRY_ENDPOINT, {headers: this.getHeaders(token)});
        }));
    }

}