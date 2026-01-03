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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('AuthOptions')}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
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
  buttonContainer: {
    gap: 12,
  },
  getStartedButton: {
    backgroundColor: '#F5F5DC', // Beige
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  getStartedButtonText: {
    color: '#2E7D32', // Forest Green
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#81C784', // Leaf Green
    fontSize: 12,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
