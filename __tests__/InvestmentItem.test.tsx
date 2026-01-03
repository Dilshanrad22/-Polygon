import React from 'react';
import { render, screen } from '@testing-library/react-native';
import InvestmentItem from '../src/components/InvestmentItem';
import { Investment } from '../src/types';

describe('InvestmentItem', () => {
  const mockInvestment: Investment = {
    id: 1,
    farmer_name: 'John Doe',
    amount: 5000.00,
    crop: 'Wheat',
    created_at: '2025-12-01T10:00:00.000Z',
  };

  it('renders investment item correctly', () => {
    render(<InvestmentItem investment={mockInvestment} />);

    // Check if farmer name is rendered
    expect(screen.getByText('John Doe')).toBeTruthy();

    // Check if amount is formatted and rendered
    expect(screen.getByText('$5,000.00')).toBeTruthy();

    // Check if crop is rendered
    expect(screen.getByText('Wheat')).toBeTruthy();

    // Check if date is formatted and rendered
    expect(screen.getByText('Dec 1, 2025')).toBeTruthy();
  });

  it('renders with testID', () => {
    render(<InvestmentItem investment={mockInvestment} />);
    
    expect(screen.getByTestId('investment-item')).toBeTruthy();
  });

  it('shows pending state when isPending is true', () => {
    render(<InvestmentItem investment={mockInvestment} isPending={true} />);
    
    expect(screen.getByText('Saving...')).toBeTruthy();
  });

  it('formats large amounts correctly', () => {
    const largeAmountInvestment: Investment = {
      ...mockInvestment,
      amount: 1250000.50,
    };

    render(<InvestmentItem investment={largeAmountInvestment} />);

    expect(screen.getByText('$1,250,000.50')).toBeTruthy();
  });

  it('renders different crop types', () => {
    const cornInvestment: Investment = {
      ...mockInvestment,
      crop: 'Corn',
    };

    render(<InvestmentItem investment={cornInvestment} />);

    expect(screen.getByText('Corn')).toBeTruthy();
  });
});
