import { Component, OnInit } from '@angular/core';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { sampleData, displayDate } from '../Models/event-utc';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  
  public selectedDate: Date = displayDate;
    public startTime = '07:00';
    public events: SchedulerEvent[] = sampleData;

  ngOnInit(){

  }

  

}
