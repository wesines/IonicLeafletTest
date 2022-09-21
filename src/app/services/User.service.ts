import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public listUsers = [];

  constructor(private http: HttpClient) {}

  public loadFromAPI(): Observable<any> {
    return this.http.get(`http://localhost:8000/api/user`);
  }
}
