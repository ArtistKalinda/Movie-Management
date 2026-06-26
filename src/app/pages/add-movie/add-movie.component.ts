import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { MovieService } from '../../services/movie.service';

import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    NavbarComponent
  ],
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {

  movie = {

    movieName: '',

    director: '',

    producer: '',

    rating: 0

  };

  selectedFile: File | null = null;

  previewUrl: string | ArrayBuffer | null = null;

  constructor(

    private service: MovieService,

    private router: Router

  ) { }

  onFileSelected(event: any): void {

    if (event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];

      const reader = new FileReader();

      reader.onload = () => {

        this.previewUrl = reader.result;

      };

      reader.readAsDataURL(this.selectedFile!);

    }

  }

  saveMovie(): void {

    const formData = new FormData();

    formData.append(

      'MovieName',

      this.movie.movieName

    );

    formData.append(

      'Director',

      this.movie.director

    );

    formData.append(

      'Producer',

      this.movie.producer

    );

    formData.append(

      'Rating',

      this.movie.rating.toString()

    );

    if (this.selectedFile) {

      formData.append(

        'Poster',

        this.selectedFile

      );

    }

    this.service
      .addMovie(formData)
      .subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Movie Added',

            text: 'Movie Added Successfully',

            confirmButtonColor: '#6366f1'

          }).then(() => {

            this.router.navigate(

              ['/movies']

            );

          });

        },

        error: (err) => {

          console.log(err);

          Swal.fire({

            icon: 'error',

            title: 'Failed',

            text: 'Movie could not be added.',

            confirmButtonColor: '#ef4444'

          });

        }

      });

  }

}