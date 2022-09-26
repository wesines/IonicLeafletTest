import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders().append('Content-Type', 'application/json'),
  };
  public listUsers = [];

  constructor(private geolocation: Geolocation, private http: HttpClient) {}

  public loadFromAPI(): Observable<any> {
    return this.http.get(`http://localhost:8000/api/user`);
  }

  createUser(user: User): Observable<any> {
    return Observable.fromPromise(
      this.geolocation.getCurrentPosition()
    ).mergeMap((currentLocation) => {
      user.lat = currentLocation.coords.latitude.toString();
      user.lng = currentLocation.coords.longitude.toString();
      return this.http
        .post('http://localhost:8000/api/user', user, this.httpOptions)
        .pipe(catchError(this.handleError<User>('Error occured')));
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
