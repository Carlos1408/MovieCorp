import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  $fillUserForm = new EventEmitter<User>();

  private URL_API = `${environment.API_BASE_URL}/api/v1/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL_API);
  }

  getUser(_id: string): Observable<User> {
    return this.http.get<User>(`${this.URL_API}/${_id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.URL_API, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.URL_API}/${user._id}`, user);
  }

  deleteUser(_id: string): Observable<User> {
    return this.http.delete<User>(`${this.URL_API}/${_id}`);
  }
}
