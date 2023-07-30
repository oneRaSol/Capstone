import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private user: { role: string; } = { role: 'anonymous' };
  user$: Observable<{ role: string; }> | undefined;

  // isLoggedIn() {
  //   throw new Error('Method not implemented.');
  // }
  isAdminLoggedIn(): boolean {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(
  //     AUTH_API + 'signin',
  //     {
  //       username,
  //       password,
  //     },
  //     httpOptions
  //   );
  // }

  login(username: string, password: string): Observable<boolean> {
    // Perform login logic here
    this.isLoggedIn = true;
    this.user = { role: 'user' };
    this.user$ = of(this.user);
    return of(true);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }


  getUser(): Observable<{ role: string; }> {
    return of(this.user);
  }

  public isLoggedIn$(): Observable<boolean> {
    return of(this.isLoggedIn);
  }

  // public isLoggedIn(): Observable<boolean> {
  //   return of(this.isLoggedIn);
  // }
  // logout(): Observable<any> {
  //   return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  // }
  logout(): Observable<boolean> {
    // Perform logout logic here
    this.isLoggedIn = false;
    this.user = { role: 'anonymous' };
    this.user$ = of(this.user);
    return of(true);
  }
}
