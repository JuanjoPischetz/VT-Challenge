import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signInForm = new FormGroup({
    userName : new FormControl('',[Validators.required, Validators.minLength(5)]),
    password: new FormControl('',Validators.required),
    repeatPassword: new FormControl('',Validators.required)
})

login(){
  console.log(this.signInForm)
}
}
