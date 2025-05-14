import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RequestsService } from '../../services/requests.service';
import { CreditRequest } from '../../models/requests.model';
import {
  TableColumn,
  TableComponent,
} from '../../components/table/table.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-requests',
  imports: [CommonModule, TableComponent, NavbarComponent, FormsModule],
  templateUrl: './review-requests.component.html',
  styleUrl: './review-requests.component.css',
})
export class ReviewRequestsComponent {
  _authService: AuthService;
  _requestsService: RequestsService;
  _router: Router;

  @ViewChild('statusTemplate') statusTemplateRef!: TemplateRef<any>;
  @ViewChild('actionsTemplate') actionsTemplateRef!: TemplateRef<any>;

  requests: (CreditRequest & { index: number; actions: number })[] = [];
  columns: TableColumn<
    Partial<CreditRequest & { index: number; actions: number }>
  >[] = [
    { header: 'N°', key: 'index' },
    { header: 'Monto', key: 'amount' },
    { header: 'Meses de Plazo', key: 'termMonths' },
    { header: 'Ingreso Mensual', key: 'monthlyIncome' },
    { header: 'Años de Antigüedad', key: 'jobSeniorityYears' },
    { header: 'Estado', key: 'status', template: this.statusTemplateRef },
    { header: 'Fecha de Solicitud', key: 'requestDate' },
    { header: 'Acciones', key: 'actions', template: this.actionsTemplateRef },
  ];

  statuses = [
    { value: 1, label: 'Pendiente' },
    { value: 2, label: 'Aprobada' },
    { value: 3, label: 'Rechazada' },
  ];

  statusSelected: number = null!;

  constructor(
    private authService: AuthService,
    private requestsService: RequestsService,
    private router: Router
  ) {
    this._requestsService = requestsService;
    this._authService = authService;
    this._router = router;
  }

  ngOnInit(): void {
    const userData = this._authService.getUserData();
    this.getRequests(this.statusSelected);
  }

  getRequests(status?: number) {
    this._requestsService.getAllRequests(status).subscribe({
      next: (res) => {
        if (!res.data) {
          console.warn('No requests found');
        } else {
          this.requests = res.data.map((request, index) => ({
            ...request,
            index: index + 1,
            actions: request.id,
          }));
        }
      },
      error: (error) => {
        console.error('Error fetching requests:', error);
      },
    });
  }

  ngAfterViewInit() {
    console.log('this.statusTemplateRef', this.statusTemplateRef);
    this.columns[5].template = this.statusTemplateRef;
    this.columns[7].template = this.actionsTemplateRef;
  }

  viewDetails(requestId: number) {
    this._router.navigate(['/review-requests', requestId]);
  }
}
