import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbAuthService, NbAuthToken } from '@nebular/auth';

@Injectable()
export class BaseClient {    
    constructor(protected http: HttpClient, protected authService: NbAuthService) {
    }        

    protected getHeaders(token: NbAuthToken, jsonContent: boolean = true): HttpHeaders {
        let headers = { 'Authorization': 'Bearer ' + token };

        if(jsonContent) {
            headers['Content-Type'] = 'application/json';
        }

        return new HttpHeaders(headers);
    }

}