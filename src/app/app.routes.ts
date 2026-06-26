import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { AddMovieComponent } from './pages/add-movie/add-movie.component';
import { EditMovieComponent } from './pages/edit-movie/edit-movie.component';
import { authGuard }from './guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

 {
  path:'dashboard',
  component:DashboardComponent,
  canActivate:[authGuard]
},
 {
  path:'movies',
  component:MovieListComponent,
  canActivate:[authGuard]
},

  {
  path:'add-movie',
  component:AddMovieComponent,
  canActivate:[authGuard]
},

 {
  path:'edit-movie/:id',
  component:EditMovieComponent,
  canActivate:[authGuard]
}

];