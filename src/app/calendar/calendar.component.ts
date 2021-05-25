import { Component, OnInit } from '@angular/core';
import { Day } from '../models/day.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  emptyStartDivs = [];
  emptyEndDivs = [];
  importantDays:[string];
  imp:string;
  
  thisDay = new Date();
  month = new Date().getMonth();
  year = new Date().getFullYear();
  oneMontsDate:[Day];
  dayOneForMonth:Date;

  constructor(){
    this.createMonth(this.year,this.month);
    
  }
  ngOnInit(): void {
  }

  createMonth(year:number, month:number){
    this.dayOneForMonth = new Date(year, month, 1);
    this.oneMontsDate = [{date:new Date()}];
    this.emptyStartDivs = [];
    this.emptyEndDivs = [];

    for (let i = 0; this.dayOneForMonth.getMonth()===month; i++) {
      // const important = true?this.importantDays.indexOf(this.dayOneForMonth.toDateString())>-1:false
      const important = true?this.imp===this.dayOneForMonth.toDateString():false;

      this.oneMontsDate[i] = {date:new Date(this.dayOneForMonth.toDateString()), important:important};
      this.dayOneForMonth.setDate(this.dayOneForMonth.getDate()+1);
    }
    console.log(this.oneMontsDate)
    for (let i = 0; i < this.oneMontsDate[0].date.getDay(); i++) {
      this.emptyStartDivs[i] = i;
    }
    for (let i = 0; i < 6 - this.oneMontsDate[this.oneMontsDate.length-1].date.getDay(); i++) {
      this.emptyEndDivs[i] = i;
    }
  }

  prev(){
    this.month--;
    if(this.month<0){
      this.month=11;
      this.year--;
    }
    this.createMonth(this.year,this.month);
  }

  next(){
    this.month++;
    if(this.month>11){
      this.month=0;
      this.year++;
    }
    this.createMonth(this.year,this.month);
  }

  addImportantDay(day:Day){
    if(day.important){
      // this.importantDays.splice(this.importantDays.indexOf(day.date.toDateString()),1);
      this.imp = '';
      day.important = false;
    }else{
    this.imp= day.date.toDateString()
    day.important=true;
    this.createMonth(this.year,this.month);
    }
    console.log(this.importantDays)
    
  }

}
