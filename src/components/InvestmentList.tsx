import React from 'react';
import { FlatList, Text, StyleSheet, View, RefreshControl, ActivityIndicator } from 'react-native';
import { Investment } from '../types';
import InvestmentItem from './InvestmentItem';

interface InvestmentListProps {
  /** Array of investments to display */
  investments: Investment[];
  /** Whether data is being loaded initially */
  isLoading: boolean;
  /** Whether data is being refreshed (pull-to-refresh) */
  isRefreshing: boolean;
  /** Error message if any */
  error: string | null;
  /** Callback for pull-to-refresh */
  onRefresh: () => void;
  /** ID of the pending (optimistic) investment */
  pendingId?: number;
}

/**
 * Component to display a scrollable list of investments with pull-to-refresh
 */
const InvestmentList: React.FC<InvestmentListProps> = ({
  investments,
  isLoading,
  isRefreshing,
  error,
  onRefresh,
  pendingId,
}) => {
  // Show loading indicator on initial load
  if (isLoading && investments.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" testID="loading-indicator" />
        <Text style={styles.loadingText}>Loading investments...</Text>
      </View>
    );
  }

  // Show error state
  if (error && investments.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText}>Pull down to retry</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Show error banner if there's an error but we have cached data */}
      {error && investments.length > 0 && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>⚠️ {error}</Text>
        </View>
      )}
      
      <FlatList
        testID="investment-list"
        data={investments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <InvestmentItem 
            investment={item} 
            isPending={item.id === pendingId}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['#4CAF50']}
            tintColor="#4CAF50"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🌱</Text>
            <Text style={styles.emptyText}>No investments yet</Text>
            <Text style={styles.emptySubtext}>Tap the + button to create one</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8D6E63', // Soil Brown
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  retryText: {
    fontSize: 14,
    color: '#8D6E63', // Soil Brown
  },
  errorBanner: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  errorBannerText: {
    color: '#C62828',
    fontSize: 14,
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32', // Forest Green
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8D6E63', // Soil Brown
    marginTop: 8,
  },
});

export default InvestmentList;
