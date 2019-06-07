import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Subscription } from 'rxjs';

import { WeatherService } from '../weather.service';

const charAnimation =
  trigger('char', [
    state('open1', style({
      'position': 'relative',
      'font-size': '90px',
      'left': '25px',
      'top': '170px',
    })),
    state('open2', style({
      'position': 'relative',
      'font-size': '90px',
      'left': '25px',
      'top': '85px',
    })),
    state('open3', style({
      'position': 'relative',
      'font-size': '90px',
      'left': '25px',
      'top': '-10px',
    })),
    state('open4', style({
      'position': 'relative',
      'font-size': '90px',
      'left': '25px',
      'top': '-70px',
    })),
    state('open5', style({
      'position': 'relative',
      'font-size': '90px',
      'left': '25px',
      'top': '-155px',
    })),
    state('closed', style({
      'font-size': '60px',
      'left': '0px',
      'top': '0px',
      'position': 'relative'
    })),
    transition('* => closed', [
      animate('.15s')
    ]),
    transition('closed => *', [
      animate('.3s')
    ])
  ]) 
   
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
  animations: [
    charAnimation
  ]
})
export class MoreComponent implements OnInit {
  s: number;
  wind_dir: string;
  wind_kph: number;
  humidity: number;
  pressure_mb: number;
  condition: string;
  sunrise: string;
  sunset: string;
  city: string;
  img: any;
  image: any; 
  lightModeActive: boolean;
  subscription: Subscription;
  isOpen: boolean[] = [false, false, false, false, false];
  i: number;

  constructor(private service: WeatherService) { }

  getAll(char: number){
    this.s = char;
    for(this.i = 0; this.i < this.isOpen.length; this.i++){
      if(this.i !== char){
        this.isOpen[this.i] = false;
      }
      else{
        this.isOpen[this.i] = true;
      }
    }
  }

  addMovie(){
    
  }

  ngOnInit() {
    this.subscription = this.service.enableLightMode.subscribe(data => {
    this.lightModeActive = data;})
    this.city = this.service.chosedCity;
    this.service.getCurrent(this.service.chosedCity)
      .subscribe( 
        data => {
          this.wind_dir = data.current.wind_dir;
          this.wind_kph = data.current.wind_kph;
          this.humidity = data.current.humidity;
          this.pressure_mb = data.current.pressure_mb;
          this.condition = data.current.condition.text.toLowerCase();
          this.img = document.createElement('img');
          this.img.src = data.current.condition.icon;
          this.image = document.getElementById('icon');
          this.image.appendChild(this.img);
    })
    this.service.getForecast(this.service.chosedCity)
      .subscribe( 
        data => {
          this.sunrise = data.forecast.forecastday[0].astro.sunrise;
          this.sunset = data.forecast.forecastday[0].astro.sunset;
    })
  }

}
