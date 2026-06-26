import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    SidebarComponent,
    NavbarComponent
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];

  allMovies: Movie[] = [];

  searchText = '';

  isLoading = false;

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {

    this.loadMovies();

  }

  loadMovies(): void {

    this.isLoading = true;

    this.movieService
      .getMovies()
      .subscribe({

        next: (data) => {

          this.movies = data;

          this.allMovies = data;

          this.isLoading = false;

        },

        error: (err) => {

          console.log(err);

          this.isLoading = false;

          Swal.fire({

            icon: 'error',

            title: 'Load Failed',

            text: 'Failed To Load Movies'

          });

        }

      });

  }

  searchMovie(): void {

    const search =
      this.searchText
        .trim()
        .toLowerCase();

    if (!search) {

      this.movies = this.allMovies;

      return;

    }

    this.movies =
      this.allMovies.filter(movie =>

        movie.movieName
          .toLowerCase()
          .includes(search)

      );

  }

  deleteMovie(id: number): void {

    Swal.fire({

      title: 'Delete Movie?',

      text: 'This action cannot be undone',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#dc3545',

      cancelButtonColor: '#6c757d',

      confirmButtonText: 'Delete',

      cancelButtonText: 'Cancel'

    }).then((result) => {

      if (result.isConfirmed) {

        this.movieService
          .deleteMovie(id)
          .subscribe({

            next: () => {

              Swal.fire({

                icon: 'success',

                title: 'Deleted',

                text: 'Movie Deleted Successfully',

                timer: 1500,

                showConfirmButton: false

              });

              this.loadMovies();

            },

            error: (err) => {

              console.log(err);

              Swal.fire({

                icon: 'error',

                title: 'Delete Failed',

                text: 'Something Went Wrong'

              });

            }

          });

      }

    });

  }

}