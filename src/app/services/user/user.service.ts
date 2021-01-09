import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse, IUserDTO } from 'src/app/interfaces/api.model';
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

    registerUser(userDTO: IUserDTO) {
      return this.http.post<IResponse>(`${this.endPoint}${this.version}authorize/create-user`, userDTO);
    }

    editUser(userDTO: IUserDTO) {
      return this.http.put<IResponse>(`${this.endPoint}${this.version}authorize/edit-user`, userDTO);
    }
}
