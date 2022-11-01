import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ignoreElements, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoginCredentials } from '../interfaces/login-credentials';
import { User } from 'src/app/shared/interfaces/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  private role = new BehaviorSubject<string | null>(null);
  role$ = this.role.asObservable();

  isLoggedIn$ = this.user$.pipe(map(Boolean));

  private URL_API = `${environment.API_BASE_URL}/api/v1/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    // this.loadUser();
  }

  logIn(credentials: LoginCredentials): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/login`, credentials).pipe(
      tap((res) => this.saveToken(res.token)),
      tap((res) => this.pushNewUser(res)),
      tap(() => this.redirectToHome()),
      ignoreElements()
    );
  }

  logOut(): void {
    this.removeUser();
    this.user.next(null);
    this.redirectToHome();
  }

  private redirectToHome(): void {
    this.user$
      .pipe(
        tap((u: User | null) => {
          if (!u) this.router.navigateByUrl('/');
          else {
            if (u.role === 'admin') this.router.navigateByUrl('/admin');
            if (u.role === 'manager') this.router.navigateByUrl('/management');
          }
        }),
        ignoreElements()
      )
      .subscribe();
  }

  private saveToken(token: any): void {
    this.cookieService.set('token', token);
  }

  private pushNewUser(res: any): void {
    this.user.next(this.decodeToken(res.user, res.token));
  }

  private decodeToken(user: User, token: any): User {
    return { ...user, token };
  }

  private loadUser(): void {
    console.log('relogin');
    
    this.http
      .get<any>(`${this.URL_API}/relogin`)
      .pipe(
        tap((res) => this.pushNewUser(res)),
        tap(() => this.redirectToHome()),
        ignoreElements()
      )
      .subscribe();
  }

  private removeUser(): void {
    this.cookieService.delete('token');
  }
}
