import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-stopwatch';
  intervalTimer: number = 0;
  startTime: number = 0;
  stopTime: number = 0;
  time: number = 0;
  stringTime: string = '00:00';
  onGoing: boolean = false;

  wasClicked: boolean = false;
  timeClicked: number = 0;

  ngOnInit(): void {
    const obs$ = interval(1000);
    let seconds = '00';
    let minutes = '00';
    obs$.subscribe((d) => {
      this.intervalTimer = d;
      if (this.onGoing) {
        this.time = this.intervalTimer - (this.startTime + 1);
        seconds = (this.time % 60 < 10) ? `0${this.time % 60}` : `${this.time % 60}`;
        minutes = (this.time >= 60)
          ? (Math.floor(this.time / 60) < 10)
            ? `0${Math.floor(this.time / 60)}`
            : `${Math.floor(this.time / 60)}`
          : '00';
        this.stringTime = `${minutes}:${seconds}`;
      }
    })
  }

  onClick(name: string) {
    switch (name) {
      case 'start': {
        if (this.stopTime > 0) {
          this.startTime = this.startTime + (this.intervalTimer - this.stopTime);
          this.stopTime = 0;
        } else {
          this.startTime = this.intervalTimer;
        }
        this.onGoing = true;
        break;
      }
      case 'stop': {
        this.onGoing = false;
        this.stopTime = 0;
        break;
      }
      case 'wait': {
        if (this.wasClicked) {
          if ((Date.now() - this.timeClicked) <= 500) {
            this.onGoing = false;
            this.stopTime = this.intervalTimer;
            this.wasClicked = false;
          } else {
            this.timeClicked = Date.now();
          }
        } else {
          this.timeClicked = Date.now();
          this.wasClicked = true;
        }
        break;
      }
      case 'reset': {
        this.startTime = this.intervalTimer;
        this.onGoing = true;
        break;
      }
    }
  }
}

