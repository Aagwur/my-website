import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  enableLightMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  getWeather(city: string){
    return this.http.get<any>(`http://api.apixu.com/v1/current.json?key=1c5445bfd9ca435981b130900192105&q=${city}`)
  }
}
