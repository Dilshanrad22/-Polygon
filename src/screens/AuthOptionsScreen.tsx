import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type AuthOptionsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AuthOptions'>;
};

const AuthOptionsScreen: React.FC<AuthOptionsScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
      
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🌾</Text>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>
          Choose how you'd like to continue
        </Text>
      </View>

      {/* Features */}
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

      {/* Auth Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginIcon}>👤</Text>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.loginButtonText}>Login</Text>
            <Text style={styles.loginButtonSubtext}>Already have an account</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupIcon}>✨</Text>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.signupButtonText}>Create Account</Text>
            <Text style={styles.signupButtonSubtext}>New to FarmInvest</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Guest Option */}
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.guestIcon}>👁️</Text>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
            <Text style={styles.guestButtonSubtext}>Browse without an account</Text>
          </View>
          <Text style={styles.arrowLight}>→</Text>
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
    paddingTop: 50,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#81C784', // Leaf Green
    textAlign: 'center',
  },
  features: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#F5F5DC', // Beige
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  buttonTextContainer: {
    flex: 1,
  },
  loginButtonText: {
    color: '#2E7D32', // Forest Green
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButtonSubtext: {
    color: '#8D6E63', // Soil Brown
    fontSize: 13,
    marginTop: 2,
  },
  signupButton: {
    backgroundColor: '#8D6E63', // Soil Brown
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  signupIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButtonSubtext: {
    color: '#F5F5DC', // Beige
    fontSize: 13,
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: '#81C784', // Leaf Green
    fontSize: 14,
    marginHorizontal: 16,
  },
  guestButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  guestIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  guestButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  guestButtonSubtext: {
    color: '#81C784', // Leaf Green
    fontSize: 13,
    marginTop: 2,
  },
  arrowLight: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footerText: {
    color: '#81C784', // Leaf Green
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AuthOptionsScreen;
