import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import {
  trigger,
  style,
  animate,
  transition,
  state
} from '@angular/animations';
import { Subscription } from 'rxjs';

import { WeatherService } from '../weather.service';

const favAnimation =
  trigger('fav', [
    transition(':leave', [
      style({ opacity: 1 }),
      animate('.5s', style({ opacity: 0 })),
    ]),
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.5s', style({ opacity: 1})),
    ]),
  ])
const weatherAnimation =
  trigger('weather', [
    transition(':enter', [
      style({top: "-1%", opacity: 0}),
      animate('.3s', style({ top: '16%', opacity: 1 })),
    ])    
  ])
  
export type move = 'forecast' | 'current';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    favAnimation,
    weatherAnimation
  ]
})
export class ListComponent implements OnInit {
  temperature: number;
  moveTo: string;
  move: move = 'current';
  city_t: string;
  city: string;
  text = new FormControl('');
  maxTemp: number;
  minTemp: number;
  lightModeActive: boolean;
  subscription: Subscription;

  constructor(private service: WeatherService) { }

  get showNone() {
    return this.moveTo === 'none';
  }

  get showTemperature() {
    return this.moveTo === 'temperature';
  } 

  get showForecast() {
    return this.move === 'forecast';
  }

  get showCurrent() {
    return this.move === 'current';
  } 

  toggleEditor(type: move) {
    this.move = type;
  }

  addFav(city: string){
    if(this.service.cities.length > 2){
      this.service.cities = this.service.cities.slice(0, -1);
      
    }
    this.service.cities = this.service.cities.filter(x => x !== city)
    this.service.cities.unshift(city);
    this.text.setValue('');
  }

  delete(){
    this.moveTo = 'no';
  }

  getCurrent(city: string){
    if (city.trim()){
      this.service.getCurrent(city)
        .subscribe( 
          data => {
            this.temperature = data.current.temp_c;
            this.moveTo = 'temperature';
            this.city_t = city;
          },
          error => {
            this.moveTo = 'none';
            this.city_t = city;
          } 
          )
    }
    else{
      this.delete();
    }
  }

  getForecast(city: string){
    if (city.trim()){
      this.service.getForecast(city)
        .subscribe( 
          data => {
            this.maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
            this.minTemp = data.forecast.forecastday[0].day.mintemp_c;
            this.moveTo = 'temperature';
            this.city_t = city;
          },
          error => {
            this.moveTo = 'none';
            this.city_t = city;
          } 
          )
    }
    else{
      this.delete();
    }
  }
  
  ngOnInit() {
    this.subscription = this.service.enableLightMode.subscribe(data => {
    this.lightModeActive = data;})
    this.city = this.service.chosedCity;
    if (this.city.trim()){
      this.text.setValue(this.city);
      this.service.getForecast(this.city)
        .subscribe( 
          data => {
            this.temperature = data.current.temp_c;
            this.moveTo = 'temperature';
            this.city_t = this.city;
        })
    }
  }
}
