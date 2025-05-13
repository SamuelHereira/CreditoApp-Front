import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditRequest, CreditRequestPayload } from '../models/requests.model';
import { Observable } from 'rxjs';
import { IResponse } from '../models/responses.model';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private readonly apiUrl = 'http://localhost:5082/api/requests';

  constructor(private http: HttpClient) {}

  getAllRequests(): Observable<IResponse<CreditRequest[]>> {
    return this.http.get<IResponse<CreditRequest[]>>(`${this.apiUrl}`);
  }

  getUserRequests(userId: string): Observable<IResponse<CreditRequest[]>> {
    return this.http.get<IResponse<CreditRequest[]>>(
      `${this.apiUrl}/user/${userId}`
    );
  }

  getRequestById(requestId: string): Observable<IResponse<CreditRequest>> {
    return this.http.get<IResponse<CreditRequest>>(
      `${this.apiUrl}/${requestId}`
    );
  }

  createRequest(
    request: CreditRequestPayload
  ): Observable<IResponse<CreditRequest>> {
    return this.http.post<IResponse<CreditRequest>>(`${this.apiUrl}`, request);
  }

  updateRequestStatus(
    requestId: string,
    status: string
  ): Observable<IResponse<CreditRequest>> {
    return this.http.put<IResponse<CreditRequest>>(
      `${this.apiUrl}/${requestId}`,
      { status }
    );
  }

  deleteRequest(requestId: string): Observable<IResponse<CreditRequest>> {
    return this.http.delete<IResponse<CreditRequest>>(
      `${this.apiUrl}/${requestId}`
    );
  }
}
