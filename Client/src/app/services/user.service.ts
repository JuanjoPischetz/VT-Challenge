import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl : string;
  private myApiUrl : string;

  constructor() { 

    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'

  }
}
