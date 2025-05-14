import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { RequestsService } from '../../services/requests.service';
import { CreditRequest } from '../../models/requests.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-request-details',
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css',
})
export class RequestDetailsComponent {
  _authService: AuthService;
  _requestsService: RequestsService;
  _activatedRoute: ActivatedRoute;
  _router: Router;
  _alertService: AlertService;

  requestId: string | null = null;
  requestDetails: CreditRequest | null = null;

  constructor(
    private authService: AuthService,
    private requestsService: RequestsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this._requestsService = requestsService;
    this._authService = authService;
    this._activatedRoute = activatedRoute;
    this._router = router;
    this._alertService = alertService;
  }

  ngOnInit() {
    this.requestId = this._activatedRoute.snapshot.paramMap.get('id');
    this.getRequestDetails();
  }

  getRequestDetails() {
    this._requestsService.getRequestById(this.requestId!).subscribe({
      next: (res) => {
        if (!res.data) {
          this._alertService.showAlert({
            message: 'No se encontraron detalles de la solicitud',
            type: 'error',
            onEnd: () => {
              this._router.navigate(['/review-requests']);
            },
          });
        } else {
          this.requestDetails = res.data;
        }
      },
      error: (err) => {
        this._alertService.showAlert({
          message: 'Error al obtener los detalles de la solicitud',
          type: 'error',
          onEnd: () => {
            this._router.navigate(['/review-requests']);
          },
        });
      },
    });
  }

  approveRequest(requestId: number) {
    this._requestsService.updateRequestStatus(requestId, 2).subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.requestDetails = res.data!;
          this._alertService.showAlert({
            message: 'La solicitud ha sido aprobada correctamente',
            type: 'success',
            onEnd: () => {
              this._router.navigate(['/review-requests']);
            },
          });
        } else {
          this._alertService.showAlert({
            message: 'Ocurrio un error al aprobar la solicitud',
            type: 'error',
          });
        }
      },
      error: (err) => {
        this._alertService.showAlert({
          message: 'Ocurrio un error al aprobar la solicitud',
          type: 'error',
        });
      },
    });
  }

  rejectRequest(requestId: number) {
    this._requestsService.updateRequestStatus(requestId, 3).subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.requestDetails = res.data!;
          this._alertService.showAlert({
            message: 'La solicitud ha sido rechazada correctamente',
            type: 'success',
          });
        } else {
          this._alertService.showAlert({
            message: 'Error al rechazar la solicitud',
            type: 'error',
          });
        }
      },
      error: (err) => {
        this._alertService.showAlert({
          message: 'Error al rechazar la solicitud',
          type: 'error',
        });
      },
    });
  }

  goBack() {
    this._router.navigate(['/review-requests']);
  }
}
