import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { useAnimation } from '@angular/animations';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User;
  users:User[];
  confirmationPassword:string;

  constructor(private router: Router) { 
    this.user = new User;
    this.users = [];
    this.confirmationPassword = "";
  }

  ngOnInit() {
    this.users = [];
  }

  register(){

    if(this.ValidarCampos()){
      if(this.user.password === this.confirmationPassword){
        this.users = JSON.parse(localStorage.getItem("usuarios"));
    
            if(this.users == null){
              this.users = [];
              this.user.id = 0; 
             this.users.push(this.user);
            }else{
            this.users.push(this.user);
              for (let i = 0; i < this.users.length; i++) {
                this.users[i].id = i;
              }
            }
           
            localStorage.setItem("usuarios",JSON.stringify(this.users));
            alert("Agregado correctamente.");
            this.user = new User;
            this.router.navigateByUrl('/Login');
        }else{
          alert("Contraseñas diferentes, Intentelo de nuevo");
        }
    }else{
      alert("Hay campos vacios, favor llena todos los campos del registro.");
    }
    
    
  }

  ValidarCampos(){
    if(this.user.apellido== "" || this.user.apellido== undefined || this.user.email== "" || this.user.email== undefined || 
    this.user.nombre== "" || this.user.nombre== undefined || this.user.password== "" || this.user.password== undefined ||
    this.user.segundo_apellido== "" || this.user.telofono== undefined){
return false
    }else{
      return true;
    }
  }

  

}
