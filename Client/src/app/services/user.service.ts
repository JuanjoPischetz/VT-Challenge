import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl : string;
  private myApiUrl : string;

  constructor( private http : HttpClient) { 

    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'

  }

  singIn( user : User) :  Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,user)
  }

  logIn( user : User ) : Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`,user)
  }

  getUsers(): Observable<User[]>{
      return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}/admin`)
  }
}
