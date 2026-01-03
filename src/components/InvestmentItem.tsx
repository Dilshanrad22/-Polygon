import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Investment } from '../types';

interface InvestmentItemProps {
  /** The investment data to display */
  investment: Investment;
  /** Whether this is an optimistic (pending) item */
  isPending?: boolean;
}

/**
 * Component to display a single investment item in the list
 */
const InvestmentItem: React.FC<InvestmentItemProps> = ({ investment, isPending = false }) => {
  /**
   * Formats date string to readable format
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Formats amount as currency
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <View style={[styles.container, isPending && styles.pendingContainer]} testID="investment-item">
      <View style={styles.header}>
        <Text style={styles.farmerName}>{investment.farmer_name}</Text>
        <Text style={styles.amount}>{formatCurrency(investment.amount)}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.cropContainer}>
          <Text style={styles.cropLabel}>Crop:</Text>
          <Text style={styles.cropValue}>{investment.crop}</Text>
        </View>
        <Text style={styles.date}>{formatDate(investment.created_at)}</Text>
      </View>
      {isPending && (
        <Text style={styles.pendingText}>Saving...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Soft White
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#81C784', // Leaf Green
  },
  pendingContainer: {
    opacity: 0.7,
    borderWidth: 2,
    borderColor: '#2E7D32', // Forest Green
    borderStyle: 'dashed',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  farmerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32', // Forest Green
    flex: 1,
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8D6E63', // Soil Brown
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cropContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  cropValue: {
    fontSize: 14,
    color: '#2E7D32', // Forest Green
    fontWeight: '500',
    backgroundColor: '#81C784', // Leaf Green with opacity
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  date: {
    fontSize: 12,
    color: '#8D6E63', // Soil Brown
  },
  pendingText: {
    fontSize: 12,
    color: '#2E7D32', // Forest Green
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'right',
  },
});

export default InvestmentItem;
