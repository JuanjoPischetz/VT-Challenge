import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { List } from '../interfaces/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private myAppUrl : string;
  private myApiUrl : string;

  constructor( private http : HttpClient) { 

    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/list'

  }

  getList( ) : Observable<List[]> {
    return this.http.get<List[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}
