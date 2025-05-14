import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  _alertService: AlertService;

  constructor(private alertService: AlertService) {
    this._alertService = alertService;
  }
}
