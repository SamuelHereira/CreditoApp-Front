import { Component } from '@angular/core';
import {
  TableColumn,
  TableComponent,
} from '../../components/table/table.component';

interface User {
  id: number;
  email: string;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  columns: TableColumn<User>[] = [
    { key: 'id', header: 'ID' },
    { key: 'email', header: 'Correo' },
    { key: 'name', header: 'Nombre' },
  ];

  data = [
    { id: 1, email: 'juan@mail.com', name: 'Juan' },
    { id: 2, email: 'ana@mail.com', name: 'Ana' },
  ];

  actions = [
    { label: 'Ver', callback: (row: any) => console.log('Ver', row) },
    { label: 'Eliminar', callback: (row: any) => console.log('Eliminar', row) },
  ];
}
