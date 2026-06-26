import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {

    username: '',

    password: ''

  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.authService
      .login(this.loginData)

      
      .subscribe({

        next: (res: any) => {

  localStorage.setItem(
    'token',
    res.token
  );

  Swal.fire({
    icon: 'success',
    title: 'Login Successful',
    text: 'Welcome Admin',
    timer: 1500,
    showConfirmButton: false
  });

  setTimeout(() => {

    this.router.navigate(
      ['/dashboard']
    );

  }, 1500);

},
       error: () => {

  Swal.fire({
    icon: 'error',
    title: 'Login Failed',
    text: 'Invalid Username Or Password'
  });

  }
      });

  }
}