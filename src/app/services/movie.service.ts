import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl =
    'https://localhost:7183/api/movie';

  constructor(
    private http: HttpClient
  ) { }

  getMovies(): Observable<Movie[]> {

    return this.http.get<Movie[]>(
      this.apiUrl
    );

  }

  getMovieById(id:number): Observable<Movie> {

    return this.http.get<Movie>(
      `${this.apiUrl}/${id}`
    );

  }

  addMovie(formData: FormData): Observable<any> {

    return this.http.post(

      this.apiUrl,

      formData

    );

  }

  updateMovie(movie: Movie): Observable<any> {

    return this.http.put(

      this.apiUrl,

      movie

    );

  }

  deleteMovie(id:number): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/${id}`

    );

  }

}