import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private url = '';

  constructor(private http: HttpClient) { }

  sendEmail(input: any): Observable<any> {
    return this.http.post(this.url, input).pipe(
      map(
        (response: any) => {
          if (response) {
            return response;
          }
        },
        (error: any) => {
          if (error) {
            return error;
          }
        }
      )
    );
  }
}
