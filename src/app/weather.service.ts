import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  enableLightMode: BehaviorSubject<boolean> = new BehaviorSubject(true);
  cities: string[] = ['rivne'];
  chosedCity: string = '';
  check: any;
  messageTrue: boolean = true;
  message2True: boolean = true;

  constructor(private http: HttpClient) { }

  getCities(){
    this.check = JSON.parse(localStorage.getItem("city"));
    if(this.check != null && typeof this.check != undefined){
      this.cities = (JSON.parse(localStorage.getItem("city")));
    }
  }

  getCurrent(city: string){
    return this.http.get<any>(`http://api.apixu.com/v1/current.json?key=1c5445bfd9ca435981b130900192105&q=${city}`)
  }

  getForecast(city: string){
    return this.http.get<any>(` http://api.apixu.com/v1/forecast.json?key=1c5445bfd9ca435981b130900192105&q=${city}`)
  }
}
