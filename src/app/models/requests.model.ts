export interface CreditRequestPayload {
  userId: number;
  amount: number;
  termMonths: number;
  monthlyIncome: number;
  jobSeniorityYears: number;
}

export interface CreditRequest {
  id: number;
  userId: number;
  amount: number;
  termMonths: number;
  monthlyIncome: number;
  jobSeniorityYears: number;
  status: string; // 'PENDING' | 'APPROVED' | 'REJECTED'
  requestDate: string;
  createdAt: string;
  updatedAt: string;
}
