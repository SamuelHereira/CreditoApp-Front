import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginResponse } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { RequestsService } from '../../services/requests.service';
import { CreditRequestPayload } from '../../models/requests.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-new-request',
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.css',
})
export class NewRequestComponent {
  form: FormBuilder = new FormBuilder();
  formGroup = this.form.group({
    amount: [''],
    termMonths: [''],
    monthlyIncome: [''],
    jobSeniorityYears: [''],
  });
  userData: Partial<LoginResponse> = {};
  _requestsService: RequestsService = null!;

  termMonthsOptions = [
    { value: 1, label: '1 mes' },
    { value: 2, label: '2 meses' },
    { value: 3, label: '3 meses' },
    { value: 4, label: '4 meses' },
    { value: 5, label: '5 meses' },
    { value: 6, label: '6 meses' },
    { value: 12, label: '12 meses' },
    { value: 24, label: '24 meses' },
    { value: 36, label: '36 meses' },
    { value: 48, label: '48 meses' },
    { value: 60, label: '60 meses' },
  ];

  constructor(
    private fb: FormBuilder,
    authService: AuthService,
    requestsService: RequestsService,
    private alertService: AlertService
  ) {
    this.formGroup = this.fb.group({
      amount: [
        '',
        [Validators.required, Validators.min(100), Validators.max(100000)],
      ],
      termMonths: [
        '',
        [Validators.required, Validators.min(1), Validators.max(60)],
      ],
      monthlyIncome: ['', [Validators.required, Validators.min(0)]],
      jobSeniorityYears: ['', [Validators.required, Validators.min(0)]],
    });
    this.userData = authService.getUserData() || {};
    this._requestsService = requestsService;
  }

  onSubmit() {
    console.log('Form submitted:', this.formGroup.value);
    if (this.formGroup.valid) {
      const payload: CreditRequestPayload = {
        userId: this.userData.id!,
        amount: Number(this.formGroup.value.amount),
        termMonths: Number(this.formGroup.value.termMonths),
        monthlyIncome: Number(this.formGroup.value.monthlyIncome),
        jobSeniorityYears: Number(this.formGroup.value.jobSeniorityYears),
      };

      this._requestsService.createRequest(payload).subscribe({
        next: (response) => {
          this.formGroup.reset();
          this.alertService.showAlert({
            message: 'Solicitud creada exitosamente',
            type: 'success',
            duration: 1000,
            onEnd: () => {
              console.log('Redirigiendo a la página de inicio...');
              // Redirigir a la página de inicio o a donde desees
            },
          });
        },
        error: (error) => {
          this.alertService.showAlert({
            message: 'Error creando la solicitud',
            type: 'error',
            duration: 2000,
            onEnd: () => {
              console.log('Error:', error);
            },
          });
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onReset() {
    this.formGroup.reset();
  }
}
