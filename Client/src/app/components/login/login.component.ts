import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _UserService : UserService, private router : Router ){}

    loginForm = new FormGroup({
        userName : new FormControl('',Validators.required),
        password: new FormControl('',Validators.required)
    })

    login(){
      const userName : string = this.loginForm.value.userName || '';
      const password : string = this.loginForm.value.password || '';

      const user : User = {
        userName : userName,
        password : password
      }


      this._UserService.logIn(user).subscribe({
        next : (token) =>{
          alert('Log In Successfull!')
          localStorage.setItem('token',token)
          if(user.userName.startsWith('admin')){
            this.router.navigate(['/admin'])
          }else
          this.router.navigate(['/app'])
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
}
