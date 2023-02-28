import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { List } from 'src/app/interfaces/list';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor (private _ListService : ListService, private router : Router){}

    tasks : List[] = [];

    newTaskForm = new FormGroup({
        newTask : new FormControl('')
    })

    ngOnInit():void{
      this.checkToken();
      this.getList();
    }

    getList(){
      this._ListService.getList().subscribe(data =>{
        this.tasks = data;
      })
    }

    toggle(index : number){
      this.tasks[index].show = !this.tasks[index].show

      const list : List ={
        show: this.tasks[index].show,
        id : this.tasks[index].id
      }

      this._ListService.updateTask(list).subscribe({
        next : (v) =>{
          // this.getList()
        },
        error : (event: HttpErrorResponse ) =>{
          if(event.error.msg){
            alert(`${event.error.msg}`)
          }else{
            alert('Server not responding')
          }
        }
      })
    }

    addTask(){
        const newTask : string = this.newTaskForm.value.newTask || ''

        const list : List = {
          title : newTask
        }

        this._ListService.addNewTask(list).subscribe({
          next : (v) =>{
            this.getList()
            this.newTaskForm.value.newTask = '';
          },
          error : (event: HttpErrorResponse ) =>{
            if(event.error.msg){
              alert(`${event.error.msg}`)
            }else{
              alert('Server not responding')
            }
          }
        })
    }

    deleteTask(index : number){
      const id = this.tasks[index].id || ''

      console.log(id)

      this._ListService.deleteTask(id).subscribe({
        next : (v) =>{
          this.getList()
        },
        error : (event: HttpErrorResponse ) =>{
          this.getList()
        }
      })
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
