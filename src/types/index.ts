/**
 * Investment data type returned from API
 */
export interface Investment {
  id: number;
  farmer_name: string;
  amount: number;
  crop: string;
  created_at: string;
}

/**
 * Input type for creating a new investment
 */
export interface NewInvestmentInput {
  farmer_name: string;
  amount: string;
  crop: string;
}

/**
 * API error response type
 */
export interface ApiError {
  errors?: string[];
  error?: string;
}
