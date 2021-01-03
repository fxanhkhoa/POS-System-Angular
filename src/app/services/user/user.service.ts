import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
  endPoint = environment.endPoint;
  version = environment.apiVersion;
    constructor(private http: HttpClient) {}
    
    checkExisted() {
      return this.http.get<{result: Boolean}>(`${this.endPoint}${this.version}authorize/check-existed`);
    }
}
