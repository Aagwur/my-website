import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  enableLightMode: BehaviorSubject<boolean> = new BehaviorSubject(false);
  cities: string[] = [];
  chosedCity: string;
  constructor(private http: HttpClient) { }

  getCurrent(city: string){
    return this.http.get<any>(`http://api.apixu.com/v1/current.json?key=1c5445bfd9ca435981b130900192105&q=${city}`)
  }

  getForecast(city: string){
    return this.http.get<any>(` http://api.apixu.com/v1/forecast.json?key=1c5445bfd9ca435981b130900192105&q=${city}`)
  }

  searchCities(city: string){
    if (!city.trim()) {
      return of([]);
    }
    return this.http.get<any>(`http://api.apixu.com/v1/current.json?key=1c5445bfd9ca435981b130900192105&q=${city}`)
  }
}
