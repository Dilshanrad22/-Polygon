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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Image 
          source={require('../../assets/mylogo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>AgriPocket</Text>
        <Text style={styles.subtitle}>
          Agriculture in your pocket
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
    backgroundColor: '#FFFFFF', // White
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32', // Forest Green
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8D6E63', // Soil Brown
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#2E7D32', // Forest Green
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  getStartedButtonText: {
    color: '#FFFFFF', // White
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#8D6E63', // Soil Brown
    fontSize: 12,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
