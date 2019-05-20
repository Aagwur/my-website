import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private service: WeatherService) { }

  ngOnInit() {
  }

  setCity(id: number){
    this.service.id = id;
  }
}
