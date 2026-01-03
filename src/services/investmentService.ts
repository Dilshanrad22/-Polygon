import { Investment, NewInvestmentInput, ApiError } from '../types';
import { API_ENDPOINTS } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = '@AgriPocket:token';

/**
 * Fetches all investments from the API for the authenticated user
 * @returns Promise with array of investments
 * @throws Error if the request fails
 */
export const fetchInvestments = async (): Promise<Investment[]> => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  
  const response = await fetch(API_ENDPOINTS.investments, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
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
  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  
  const response = await fetch(API_ENDPOINTS.investments, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
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
