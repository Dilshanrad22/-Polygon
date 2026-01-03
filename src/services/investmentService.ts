import { Investment, NewInvestmentInput, ApiError } from '../types';
import { API_ENDPOINTS } from '../config/api';

/**
 * Fetches all investments from the API
 * @returns Promise with array of investments
 * @throws Error if the request fails
 */
export const fetchInvestments = async (): Promise<Investment[]> => {
  const response = await fetch(API_ENDPOINTS.investments);
  
  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch investments');
  }
  
  return response.json();
};

/**
 * Creates a new investment via the API
 * @param input - The investment data to create
 * @returns Promise with the created investment
 * @throws Error if the request fails or validation fails
 */
export const createInvestment = async (input: NewInvestmentInput): Promise<Investment> => {
  const response = await fetch(API_ENDPOINTS.investments, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      farmer_name: input.farmer_name.trim(),
      amount: parseFloat(input.amount),
      crop: input.crop.trim(),
    }),
  });
  
  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({}));
    const errorMessage = errorData.errors?.join(', ') || errorData.error || 'Failed to create investment';
    throw new Error(errorMessage);
  }
  
  return response.json();
};
