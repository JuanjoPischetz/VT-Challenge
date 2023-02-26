import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginForm = new FormGroup({
        userName : new FormControl('',Validators.required),
        password: new FormControl('',Validators.required)
    })

    login(){
      console.log(this.loginForm)
    }
}
