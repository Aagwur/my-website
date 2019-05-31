import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group,
  animateChild
} from '@angular/animations';

import { WeatherService } from './weather.service';

const slideInAnimation =
  trigger('routeAnimations', [
    transition('SearchPage <=> ListPage', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%',
          height: '100%'
        })
      ]),
      query(':enter', [
        style({ top: '-100%'})
      ]),
      group([
        query(':leave', [
          animate('400ms ease-out', style({ opacity: '0'}))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ top: '0px'}))
        ])
      ])
    ]),
    transition('ListPage <=> MorePage', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%',
          height: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      group([
        query(':leave', [
          animate('400ms ease-out', style({ opacity: '0'}))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ left: '0px'}))
        ])
      ])
    ])
  ]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {
  lightModeActive: boolean;
  subscription: Subscription;
  
  constructor(private service: WeatherService) { }

  prepareRoute(outlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit(){ 
    this.subscription = this.service.enableLightMode.subscribe(data => {
    this.lightModeActive = data;
  })}
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
