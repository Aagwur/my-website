import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  temperature: number;
  moveTo: string;
  city_t: string;

  constructor(private service: WeatherService) { }

  get showNone() {
    return this.moveTo === 'none';
  }

  get showTemperature() {
    return this.moveTo === 'temperature';
  } 

  getData(city: string){
    if (city.trim()){
      this.service.getWeather(city)
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
  }
  
  ngOnInit() {
  }

}
