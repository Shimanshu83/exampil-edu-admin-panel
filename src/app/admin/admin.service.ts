// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';  


@Injectable()
export class AdminService {

    private apiUrl = environment.apiUrl ; 

    constructor(private http: HttpClient) {}

    stats( ): Observable<boolean> {
        return this.http.get<any>(`${this.apiUrl}/api/admin/stats` );
    }

  }