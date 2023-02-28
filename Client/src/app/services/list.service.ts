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

  addNewTask( list : List) :  Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,list)
  }

  updateTask( list : List) :  Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}`,list)
  }

  deleteTask(id : string) : Observable<any>{
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}`,{body : {id}})
  }
}
