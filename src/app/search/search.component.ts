import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  lightModeActive: boolean;
  subscription: Subscription;

  constructor(private service: WeatherService) { }

  modeToggleSwitch(){
    this.service.enableLightMode.next(!this.lightModeActive);
  }

  ngOnInit() { 
    this.subscription = this.service.enableLightMode.subscribe(data => {
    this.lightModeActive = data;})
  }
}
