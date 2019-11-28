import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    sessionStorage.setItem('logged_user', username);
    return this.httpClient.post<{token: string}>('http://localhost:4000/api/auth', {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  signup(username:string, password:string): Observable<boolean> {
    return this.httpClient.post<{token: string}>('http://localhost:4000/api/auth', {username: username, password: password})
    .pipe(
      map(result => {
        localStorage.setItem('access_token', result.token);
          return true;
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
