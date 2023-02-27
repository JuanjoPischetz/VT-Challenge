import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor (private _ListService : ListService){}

    ngOnInit():void{
      this.getList();
    }

    getList(){
      const userId : string = localStorage.getItem('token') || ''
      this._ListService.getList().subscribe(data =>{
        console.log(data)
      })
    }

}
