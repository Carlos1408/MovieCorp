import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cinema } from '../interfaces/cinema';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  private URL_API = `${environment.API_BASE_URL}/api/v1/cinemas`;

  constructor(private http: HttpClient) {}

  getAllCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.URL_API);
  }

  getCinema(_id: string): Observable<Cinema> {
    return this.http.get<Cinema>(`${this.URL_API}/${_id}`);
  }

  createCinema(cinema: Cinema): Observable<Cinema> {
    return this.http.post<Cinema>(this.URL_API, cinema);
  }

  updateCinema(cinema: Cinema): Observable<Cinema> {
    return this.http.put<Cinema>(`${this.URL_API}/${cinema._id}`, cinema);
  }

  deleteCinema(_id: string): Observable<Cinema> {
    return this.http.delete<Cinema>(`${this.URL_API}/${_id}`);
  }
}
