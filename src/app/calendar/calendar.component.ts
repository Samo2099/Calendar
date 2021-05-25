import { Component, OnInit } from '@angular/core';
import { Day } from '../models/day.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent{

  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  emptyStartDivs = [];
  emptyEndDivs = [];
  importantDay:string;
  
  thisDay = new Date();

  month = this.thisDay.getMonth();
  year = this.thisDay.getFullYear();

  oneMontsDate:[Date];

  constructor(){
    this.createMonth(this.year,this.month);
  }

  createMonth(year:number, month:number){
    const dayOneForMonth = new Date(year, month, 1);
    this.oneMontsDate = [null];
    this.emptyStartDivs = [];
    this.emptyEndDivs = [];

    for (let i = 0; dayOneForMonth.getMonth()===month; i++) {
      this.oneMontsDate[i] = new Date(dayOneForMonth.toDateString());
      dayOneForMonth.setDate(dayOneForMonth.getDate()+1);
    }

    for (let i = 0; i < this.oneMontsDate[0].getDay(); i++) {
      this.emptyStartDivs[i] = i;
    }

    for (let i = 0; i < 6 - this.oneMontsDate[this.oneMontsDate.length-1].getDay(); i++) {
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

  addImportantDay(day:Date){
    this.importantDay = day.toDateString();
  }

}
