import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { WeatherService } from '../weather.service';

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

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    messageAnimation
  ]
})
export class SearchComponent implements OnInit {
  lightModeActive: boolean;
  subscription: Subscription;
  cities: string[];
  message: boolean = false;

  constructor(private service: WeatherService) { }

  modeToggleSwitch(){
    this.service.enableLightMode.next(!this.lightModeActive);
  }

  addChosed(city: string){
    this.service.chosedCity = city;
  }

  closeMessage(){
    this.service.messageTrue = false;
    this.message = false;
  }

  ngOnInit() { 
    setTimeout(() => { this.message = this.service.messageTrue}, 500);
    setTimeout(() => { this.message = false}, 5500);
    this.service.getCities();
    this.cities = this.service.cities;
    this.subscription = this.service.enableLightMode.subscribe(data => {
    this.lightModeActive = data;})
  }
}
