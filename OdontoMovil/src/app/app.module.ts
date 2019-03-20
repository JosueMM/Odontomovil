import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AppRoutingModule } from './/app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';

import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    AgendaComponent
  ],
  imports: [
    BrowserModule,
    NgbModalModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    SchedulerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
