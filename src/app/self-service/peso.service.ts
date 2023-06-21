import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesoService {

  private pesoUrl = 'http://192.168.0.103/peso';

  constructor(private http: HttpClient) { }

  getLastWeight(): Observable<number> {
    return this.http.get<{ lastWeight: number }>(this.pesoUrl)
      .pipe(map(response => response.lastWeight));
  }
}