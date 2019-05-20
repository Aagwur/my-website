import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  data = this.http.get('data.json');
  id: number;
  constructor(private http: HttpClient) { }

}
