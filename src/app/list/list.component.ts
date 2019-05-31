import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import {
  trigger,
  style,
  animate,
  transition
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

const messageAnimation =
  trigger('message', [
    transition(':enter', [
      style({opacity: 0, width: '30px'}),
      animate('.2s', style({opacity: 1, width: '300px'})),
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('.6s', style({opacity: 0 })),
    ])    
  ])  
export type move = 'forecast' | 'current';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    favAnimation,
    weatherAnimation,
    messageAnimation
  ]
})
export class ListComponent implements OnInit {
  temperature: number;
  moveTo: string;
  move: move = 'current';
  city_t: string;
  city: string = '';
  text = new FormControl('');
  maxTemp: number;
  minTemp: number;
  lightModeActive: boolean;
  subscription: Subscription;
  like: boolean = true;
  message: boolean = false;
  typeMes: boolean;
  i = 0;

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
    this.typeMes;
  } 

  toggleEditor(type: move) {
    this.move = type;
  }

  addFav(city: string){
    this.service.cities = this.service.cities.filter(x => x !== city);
    this.service.cities.unshift(city);
    localStorage.setItem('city', JSON.stringify(this.service.cities));
    this.text.setValue('');
    this.message = this.service.message2True;
    if(this.service.message2True === false){
      this.like = false;
    }
    setTimeout(() => { this.message = false; this.like = false }, 5000);
  }

  delete(){
    this.moveTo = 'no';
  }

  cityIn(){
    this.service.chosedCity = this.city_t;
  }
  
  close(){
    this.service.message2True = false;
    this.message = false;
    this.like = false;
    this.text.setValue('');
  }

  closeMessage(){
    this.message = false;
  }

  getCurrent(city: string){
    this.typeMes = true;
    if (city.trim()){
      this.like = true;
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
          })
    }
    else{
      this.delete();
    }
  }

  getForecast(city: string){
    this.typeMes = false;
    if (city.trim()){
      this.like = true;
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
          })
    }
    else{
      this.delete();
    }
  }
  
  ngOnInit() {
    this.subscription = this.service.enableLightMode.subscribe(data => {
    this.lightModeActive = data;})
    this.city = this.service.chosedCity;
    this.typeMes = true;
    if (this.city.trim()){
      this.text.setValue(this.city);
      this.like = true;
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
