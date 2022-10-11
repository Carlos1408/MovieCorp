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

  getMovie(_id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.URL_API}/${_id}`);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.URL_API, movie);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.URL_API}/${movie._id}`, movie);
  }

  deleteMovie(_id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${this.URL_API}/${_id}`);
  }
}
