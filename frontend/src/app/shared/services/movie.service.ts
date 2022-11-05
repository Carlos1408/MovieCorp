import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private URL_API = `${environment.API_BASE_URL}/api/v1/movies`;

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.URL_API);
  }

  getAllMoviesLg(): Observable<Movie> {
    return this.http.get<Movie>(`${this.URL_API}/lg`);
  }

  getMovie(_id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.URL_API}/${_id}`);
  }

  getMovieLg(_id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.URL_API}/lg/${_id}`);
  }

  createMovie(form: any): Observable<Movie> {
    const formData = this.formGroup2formData(form);

    return this.http.post<Movie>(this.URL_API, formData);
  }

  updateMovie(form: any): Observable<Movie> {
    const formData = this.formGroup2formData(form);

    return this.http.put<Movie>(`${this.URL_API}/${form._id}`, formData);
  }

  deleteMovie(_id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${this.URL_API}/${_id}`);
  }

  formGroup2formData(form: any): FormData {
    const formData = new FormData();
    for (const key of Object.keys(form)) {
      formData.append(key, form[key]);
    }
    return formData;
  }
}
