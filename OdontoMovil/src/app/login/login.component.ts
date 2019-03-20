import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import {User} from '../Models/user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailLog: string;
  passLog: string;
  user: User;
  users: User[];

  constructor(private router: Router) { }

  ngOnInit() {
 this.users = JSON.parse(localStorage.getItem("usuarios"));
if(this.users == null){
this.users =[];
}
  }


  DoLogin(){
    var _existUser = false
      for (let i = 0; i < this.users.length; i++) {
        if(this.emailLog == this.users[i].email && this.passLog == this.users[i].password){
        sessionStorage.setItem("USER_LOGGED",JSON.stringify(this.users[i]));
        _existUser = true;
      }
    }
    if(_existUser){
      this.router.navigateByUrl('/Perfil');
    }else{
      alert("Credenciales Incorrectos");
    }    
  }
  
  DoRegister(){
    this.router.navigateByUrl('/Registro');
  }
}
