import { Component, OnInit, Injectable} from '@angular/core';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import {NgbCalendar,NgbTimeAdapter,NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { Cita } from '../Models/cita';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { sampleData, displayDate } from '../Models/event-utc';

@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string): NgbTimeStruct {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})


export class PerfilComponent implements OnInit {

  public selectedDate: Date = displayDate;
    public startTime = '07:00';
    public events: SchedulerEvent[] = sampleData;
  user:User;
  users:User[];
  citas:Cita[];
  cita:Cita;
  misCitas:Cita[];
  times:NgbTimeStruct;

  constructor(private router: Router,private calendar: NgbCalendar) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("USER_LOGGED"));
    if(this.user == null){
      alert("No hay ningun usuario Logeado");
      this.router.navigateByUrl('/Login');
    }
    this.cargarMisCitas();
    this.cita = new Cita;
    this.citas = [];
    

  }

  model: NgbDateStruct;
  model2: Date;

  get today() {
    return new Date();
  }


cargarfecha(){
   //Reune datos y forma la fecha en el formato necesitado
   var cita = JSON.stringify(this.times);
   if((this.times.hour.toString()).replace("",".").length > 2){  
     if ((this.times.minute.toString()).replace("",".").length > 2){
       var hora = ""+this.times.hour+":"+this.times.minute+":00.000"
       sessionStorage.setItem("hora",hora);
     }else{
       var hora = this.times.hour+":0"+this.times.minute+":00.000"
       sessionStorage.setItem("hora",hora);
     }
   }else{
     if ((this.times.minute.toString()).replace("",".").length > 2){
       var hora = "0"+this.times.hour+":"+this.times.minute+":00.000"
       sessionStorage.setItem("hora",hora);
       }else{
         var hora = "0"+this.times.hour+":0"+this.times.minute+":00.000"
         sessionStorage.setItem("hora",hora);
       }
   }
   var hora =sessionStorage.getItem("hora");
   var fechaCita = JSON.stringify(this.model2)+"T"+hora+"Z";
   var eliminandoHora = JSON.stringify(this.model2).split("T")

   for (let i = 0; i < eliminandoHora.length; i++) {
       var fechaCita = eliminandoHora[0]+"T"+hora+"Z";
       this.cita.End = (eliminandoHora[0]+"T"+hora+1+"Z").replace('"',"");
   }
   sessionStorage.setItem("cita",fechaCita.replace('"',""));
  
}

CitaReservada(){
 this.citas = null ? [] : JSON.parse(localStorage.getItem("Citas"));
 
for (let i = 0; i < this.citas.length; i++) {
  this.citas[i].TaskID = i;
  if(this.citas[i].Start === this.cita.Start){
    return false;
  }
}
  return true;
}

  registrarCita(){
   this.cargarfecha();
    //Inserta Citas en Memoria
    var insercion = false;
    this.cita.Start = sessionStorage.getItem("cita");
    this.cita.OwnerID = this.user.id;
    this.citas = JSON.parse(localStorage.getItem("Citas"));

    if(this.citas == null){
      this.cita.IsAllDay=false;
      this.citas = []
      this.cita.TaskID = 0;
      this.citas.push(this.cita)
      localStorage.setItem("Citas",JSON.stringify(this.citas));
      alert("Cita realizada con exito");
    }else{
        if(this.CitaReservada()){
          this.cita.IsAllDay = false;
          this.cita.TaskID = this.citas.length;
          this.citas.push(this.cita)
          localStorage.setItem("Citas",JSON.stringify(this.citas));
          this.cita = new Cita;
          alert("Cita realizada con exito");
          location.href ="http://localhost:4200/Perfil";
        }else{
          this.cita = new Cita;
          alert("No se puede realizar la cita, esa hora de ese dia ya esta tomado");
        } 
    }
  }

  cargarMisCitas(){
    this.misCitas = [];
    this.citas = [];
    this.citas = JSON.parse(localStorage.getItem("Citas"));
    if(this.citas != null){
      for (let i = 0; i < this.citas.length; i++) {
        if(this.citas[i].OwnerID == this.user.id){
          this.citas[i].Start = this.citas[i].Start.replace('T'," ")
          this.citas[i].Start = this.citas[i].Start.replace('.000Z',"")
           this.misCitas.push(this.citas[i]);
        }
       }
    }
   
  
  }

  eliminarCita(id){
    this.citas = JSON.parse(localStorage.getItem("Citas"));
    debugger;
      for (let i = 0; i < this.citas.length; i++) {
        if(this.citas[i].TaskID == id){
          this.citas.splice(i,1);
          localStorage.setItem("Citas",JSON.stringify(this.citas));
          alert("Se elimino la cita con exito");
          location.href ="http://localhost:4200/Perfil";
        }
      }
  }

}
