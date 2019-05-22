import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lightModeActive: boolean;
  subscription: Subscription;

  constructor(private service: WeatherService) { }

  ngOnInit(){ 
    this.subscription = this.service.enableLightMode.subscribe(data => {
    this.lightModeActive = data;
  })}
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
