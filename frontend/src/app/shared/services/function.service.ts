import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Function } from '../interfaces/function';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FunctionService {
  private URL_API = `${environment.API_BASE_URL}/api/v1/functions`;

  constructor(private http: HttpClient) {}

  getAllFunctions(): Observable<Function[]> {
    return this.http.get<Function[]>(this.URL_API);
  }

  getAllFunctionsLg(): Observable<Function[]> {
    return this.http.get<Function[]>(`${this.URL_API}/lg`);
  }

  getFunction(_id: string): Observable<Function> {
    return this.http.get<Function>(`${this.URL_API}/${_id}`);
  }

  getCinemaFunctions(cinema_id: string): Observable<Function[]> {
    return this.http.get<Function[]>(`${this.URL_API}/cinema/${cinema_id}`);
  }

  createFunction(function_: Function): Observable<Function> {
    return this.http.post<Function>(this.URL_API, function_);
  }

  updateFunction(function_: Function): Observable<Function> {
    return this.http.put<Function>(
      `${this.URL_API}/${function_._id}`,
      function_
    );
  }

  deleteFunction(_id: string): Observable<Function> {
    return this.http.delete<Function>(`${this.URL_API}/${_id}`);
  }
}
