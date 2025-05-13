import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  TableColumn,
  TableComponent,
} from '../../components/table/table.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RequestsService } from '../../services/requests.service';
import { AuthService } from '../../services/auth.service';
import {
  CreditRequest,
  CreditRequestPayload,
} from '../../models/requests.model';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  email: string;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [TableComponent, NavbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  _authService: AuthService;
  _requestsService: RequestsService;

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

  constructor(
    private authService: AuthService,
    private requestsService: RequestsService
  ) {
    this._requestsService = requestsService;
    this._authService = authService;
  }

  ngOnInit(): void {
    const userData = this._authService.getUserData();

    this._requestsService.getUserRequests(userData?.id!.toString()!).subscribe({
      next: (res) => {
        if (!res.data) {
          console.warn('No requests found for user:', userData?.id);
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

  deleteRequest(requestId: number) {
    this._requestsService.deleteRequest(requestId.toString()).subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.requests = this.requests.filter(
            (request) => request.id !== requestId
          );
        } else {
          console.error('Error deleting request:', res.message);
        }
      },
      error: (error) => {
        console.error('Error deleting request:', error);
      },
    });
  }
}
