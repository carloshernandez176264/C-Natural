import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userdto } from '../common/userdto';
import { JwtClient } from '../common/jwtclient';
import { User } from '../common/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl : string = "http://localhost:8085/api/v1/security"

  constructor(
    private httpClient : HttpClient
  ) {}

  login(userdto : Userdto){
    return this.httpClient.post<JwtClient>(this.apiUrl+ "/login", userdto)
  }

  register(user:User):Observable<User>{
    return this.httpClient.post<User>(this.apiUrl+ "/register", user)
  }


}
