import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {

  constructor(private _UserService : UserService, private router : Router ){}


  signInForm = new FormGroup({
    userName : new FormControl('',[Validators.required, Validators.minLength(5)]),
    password: new FormControl('',Validators.required),
    repeatPassword: new FormControl('',Validators.required)
})

createNewUser(){
  
  const userName : string = this.signInForm.value.userName || '';
  const password : string = this.signInForm.value.password || '';
  const repeatPassword : string = this.signInForm.value.repeatPassword || '';
  let role : string = 'user';

  //Special Character or black space Validation
  const regExp = new RegExp(`[^a-zA-Z0-9]`)
  const test = regExp.test(userName)

  if(test){
    alert('special characters not allowed')
    return
  }
  if (password !== repeatPassword){
    alert('password doesnt match')
    return
  }
  if(userName.startsWith('admin')){
    role = 'admin'
  }
  
  const user : User = {
    userName : userName,
    password : password,
    role : role
  }

 this._UserService.singIn(user).subscribe({
    next : (v) =>{
      alert('User Created!')
      this.router.navigate(['/login'])
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
