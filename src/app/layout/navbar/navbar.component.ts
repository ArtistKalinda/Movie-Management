import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private router: Router
  ) {}

  logout() {

  Swal.fire({

    title: 'Logout ?',

    text: 'Do you really want to logout?',

    icon: 'question',

    showCancelButton: true,

    confirmButtonColor: '#dc3545',

    confirmButtonText: 'Yes Logout'

  }).then((result) => {

    if(result.isConfirmed){

      localStorage.removeItem('token');

      this.router.navigate(
        ['/login']
      );

    }

  });

}
}
