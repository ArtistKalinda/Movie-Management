import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [
    FormsModule,
    SidebarComponent,
    NavbarComponent
  ],
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  movie: Movie = {

    id:0,

    movieName:'',

    director:'',

    producer:'',

    rating:0
  };

  constructor(
    private route: ActivatedRoute,
    private service: MovieService,
    private router: Router
  ){}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.service.getMovieById(id)
      .subscribe(data => {

        this.movie = data;

      });
  }

  updateMovie(){

  this.service.updateMovie(this.movie)
    .subscribe({

      next: () => {

        Swal.fire({

          icon:'success',

          title:'Movie Updated',

          text:'Movie Updated Successfully'

        });

        this.router.navigate(
          ['/movies']
        );

      },

      error: () => {

        Swal.fire({

          icon:'error',

          title:'Update Failed',

          text:'Something Went Wrong'

        });

      }

    });

}

}