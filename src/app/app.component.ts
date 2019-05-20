import { Component } from '@angular/core';

import { WeatherService } from './weather.service';
declare var $:any;

export type moveToType = 'search' | 'list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  id: number;
  data: any;
  moveTo: moveToType = 'search';

  constructor(private service: WeatherService) { }

  get showSearch() {
    return this.moveTo === 'search';
  }

  get showList() {
    return this.moveTo === 'list';
  }

  toggleEditor(type: moveToType) {
    this.moveTo = type;
  }

  getData(){
    this.id = this.service.id;
			$.ajax({
				type: 'GET',
				url: `http://api.openweathermap.org/data/2.5/forecast?id=${this.id}&APPID=93739194b74ae6bb9cc019a74bac4f7f`,
				success: function(data){
					this.data = data;
				},
			})
		}
}
