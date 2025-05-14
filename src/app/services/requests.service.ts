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

  getAllRequests(
    status?: number | null
  ): Observable<IResponse<CreditRequest[]>> {
    console.log('Fetching all requests with status:', status);
    return this.http.get<IResponse<CreditRequest[]>>(`${this.apiUrl}`, {
      params: {
        status: status ? status.toString() : '',
      },
    });
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
    requestId: number,
    status: number
  ): Observable<IResponse<CreditRequest>> {
    return this.http.put<IResponse<CreditRequest>>(
      `${this.apiUrl}/${requestId}/status`,
      { status }
    );
  }

  deleteRequest(requestId: string): Observable<IResponse<CreditRequest>> {
    return this.http.delete<IResponse<CreditRequest>>(
      `${this.apiUrl}/${requestId}`
    );
  }
}
