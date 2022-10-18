import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Function } from '../interfaces/function';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {
  private URL_API = `${environment.API_BASE_URL}/api/v1/functions`;

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<Function[]> {
    return this.http.get<Function[]>(this.URL_API);
  }

  getRoom(_id: string): Observable<Function> {
    return this.http.get<Function>(`${this.URL_API}/${_id}`);
  }

  createRoom(function_: Function): Observable<Function> {
    return this.http.post<Function>(this.URL_API, function_);
  }

  updateRoom(function_: Function): Observable<Function> {
    return this.http.put<Function>(`${this.URL_API}/${function_._id}`, function_);
  }

  deleteRoom(_id: string): Observable<Function> {
    return this.http.delete<Function>(`${this.URL_API}/${_id}`);
  }
}
