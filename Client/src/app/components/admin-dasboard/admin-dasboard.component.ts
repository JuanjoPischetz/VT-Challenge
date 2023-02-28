import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/interfaces/list';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css']
})
export class AdminDasboardComponent {

    constructor(private _UserService : UserService,private router : Router){}

    users : User[] = [];
    tasks : List[] = [];

    ngOnInit() : void{
        this.checkToken();
        this.getUserList();
    }

    getUserList(){
      this._UserService.getUsers().subscribe(data =>{
        this.users = data;
      })
    }

    setUser(index : number){
      this.tasks = this.users[index].lists
    }

    logOut(){
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    }

    checkToken(){
      if(!localStorage.getItem('token')){
        this.router.navigate(['/login'])
      }
    }
}
