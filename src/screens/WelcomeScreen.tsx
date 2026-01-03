import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
      
      <View style={styles.header}>
        <Text style={styles.logo}>🌾</Text>
        <Text style={styles.title}>FarmInvest Lite</Text>
        <Text style={styles.subtitle}>
          Invest in sustainable agriculture and grow your wealth
        </Text>
      </View>

      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>📈</Text>
          <Text style={styles.featureText}>Track your investments</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🌱</Text>
          <Text style={styles.featureText}>Support sustainable farming</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>💰</Text>
          <Text style={styles.featureText}>Earn competitive returns</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        By continuing, you agree to our Terms of Service
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E7D32', // Forest Green
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF', // Soft White
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#81C784', // Leaf Green
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF', // Soft White
    fontWeight: '500',
  },
  buttonContainer: {
    gap: 12,
  },
  loginButton: {
    backgroundColor: '#F5F5DC', // Beige
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#2E7D32', // Forest Green
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#8D6E63', // Soil Brown
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 0,
  },
  signupButtonText: {
    color: '#FFFFFF', // Soft White
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#81C784', // Leaf Green
    fontSize: 12,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
