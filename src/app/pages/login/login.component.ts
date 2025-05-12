import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // ✅ Esto dispara los errores visibles
      return;
    }

    const data: LoginRequest = this.form.value;

    this.authService.login(data).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);

        // Redirigir según el rol
        if (res.roles.includes('Analyst')) {
          this.router.navigate(['/review']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        console.log('Error en el login');
        this.errorMessage = 'Email o contraseña incorrectos';
      },
    });
  }
}
