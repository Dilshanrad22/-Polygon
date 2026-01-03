import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Investment, NewInvestmentInput } from '../types';
import { fetchInvestments as getInvestmentsFromApi, createInvestment } from '../services/investmentService';
import InvestmentList from '../components/InvestmentList';
import NewInvestmentModal from '../components/NewInvestmentModal';
import { useAuth } from '../context/AuthContext';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, logout, isGuest } = useAuth();

  const fetchInvestments = async () => {
    // Don't fetch past investments for guest users
    if (isGuest) {
      setLoading(false);
      return;
    }
    try {
      setError(null);
      const data = await getInvestmentsFromApi();
      setInvestments(data);
    } catch (err) {
      setError('Failed to load investments');
      console.error('Error fetching investments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchInvestments();
    setRefreshing(false);
  };

  const handleCreateInvestment = async (input: NewInvestmentInput): Promise<boolean> => {
    setIsSubmitting(true);
    
    try {
      const createdInvestment = await createInvestment(input);
      setInvestments(prev => [createdInvestment, ...prev]);
      setIsSubmitting(false);
      return true;
    } catch (err) {
      Alert.alert('Error', 'Failed to create investment. Please try again.');
      console.error('Error creating investment:', err);
      setIsSubmitting(false);
      return false;
    }
  };

  const handleLogout = () => {
    // Use confirm for web, Alert for native
    if (typeof window !== 'undefined' && window.confirm) {
      if (window.confirm('Are you sure you want to logout?')) {
        logout();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      }
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Logout', 
            style: 'destructive', 
            onPress: () => {
              logout();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
              });
            }
          },
        ]
      );
    }
  };

  const totalValue = investments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] || 'Investor'}!</Text>
            <Text style={styles.subtitle}>Manage your farm investments</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Portfolio Value</Text>
          <Text style={styles.totalValue}>
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
          <Text style={styles.investmentCount}>
            {investments.length} Investment{investments.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Investments</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add New</Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchInvestments}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <InvestmentList
            investments={investments}
            isLoading={loading}
            isRefreshing={refreshing}
            error={error}
            onRefresh={handleRefresh}
          />
        )}
      </View>

      <NewInvestmentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateInvestment}
        isSubmitting={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Beige
  },
  header: {
    backgroundColor: '#2E7D32', // Forest Green
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Soft White
  },
  subtitle: {
    fontSize: 14,
    color: '#81C784', // Leaf Green
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#8D6E63', // Soil Brown
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#FFFFFF', // Soft White
    fontWeight: '600',
    fontSize: 14,
  },
  totalCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#81C784', // Leaf Green
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF', // Soft White
  },
  investmentCount: {
    fontSize: 12,
    color: '#81C784', // Leaf Green
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8D6E63', // Soil Brown
  },
  addButton: {
    backgroundColor: '#2E7D32', // Forest Green
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFFFFF', // Soft White
    fontWeight: '600',
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#2E7D32', // Forest Green
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default HomeScreen;
