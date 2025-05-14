import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  isAlertVisible: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' | 'info' | 'warning' = 'info';
  alertTimeout: any;
  alertDuration: number = 3000; // Default duration in milliseconds
  alertPosition: 'top' | 'bottom' = 'top';
  alertAnimation: 'fade' | 'slide' = 'fade';

  showAlert({
    message,
    type = 'info',
    position = 'top',
    animation = 'fade',
    duration = 3000,
    onEnd = () => {},
  }: {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    position?: 'top' | 'bottom';
    animation?: 'fade' | 'slide';
    duration?: number;
    onEnd?: () => void;
  }) {
    this.isAlertVisible = true;
    this.alertMessage = message;
    this.alertType = type;
    this.alertPosition = position;
    this.alertAnimation = animation;
    this.alertDuration = duration;

    // Clear any existing timeout
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    // Set a timeout to hide the alert after the specified duration
    this.alertTimeout = setTimeout(() => {
      this.hideAlert();
      onEnd();
    }, duration);
  }

  hideAlert() {
    this.isAlertVisible = false;
    this.alertMessage = '';
    this.alertType = 'info';
    this.alertPosition = 'top';
    this.alertAnimation = 'fade';
    this.alertDuration = 3000;
    this.alertTimeout = null;
    this.alertPosition = 'top';
  }
}
