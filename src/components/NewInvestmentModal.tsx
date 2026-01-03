import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { NewInvestmentInput } from '../types';

interface NewInvestmentModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Callback when form is submitted */
  onSubmit: (input: NewInvestmentInput) => Promise<boolean>;
  /** Whether the form is currently submitting */
  isSubmitting: boolean;
}

interface FormErrors {
  farmer_name?: string;
  amount?: string;
  crop?: string;
}

/**
 * Modal component for creating a new investment
 */
const NewInvestmentModal: React.FC<NewInvestmentModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const [farmerName, setFarmerName] = useState('');
  const [amount, setAmount] = useState('');
  const [crop, setCrop] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  /**
   * Resets the form to initial state
   */
  const resetForm = () => {
    setFarmerName('');
    setAmount('');
    setCrop('');
    setErrors({});
  };

  /**
   * Validates form inputs
   * @returns true if valid, false otherwise
   */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!farmerName.trim()) {
      newErrors.farmer_name = 'Farmer name is required';
    } else if (farmerName.trim().length < 2) {
      newErrors.farmer_name = 'Farmer name must be at least 2 characters';
    }

    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    if (!crop.trim()) {
      newErrors.crop = 'Crop type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    const success = await onSubmit({
      farmer_name: farmerName,
      amount,
      crop,
    });

    if (success) {
      resetForm();
      onClose();
    }
  };

  /**
   * Handles modal close
   */
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>New Investment</Text>
              <TouchableOpacity 
                onPress={handleClose} 
                style={styles.closeButton}
                disabled={isSubmitting}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Farmer Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Farmer Name *</Text>
                <TextInput
                  style={[styles.input, errors.farmer_name ? styles.inputError : undefined]}
                  placeholder="Enter farmer name"
                  placeholderTextColor="#999"
                  value={farmerName}
                  onChangeText={setFarmerName}
                  editable={!isSubmitting}
                  testID="farmer-name-input"
                  autoCapitalize="words"
                />
                {errors.farmer_name && (
                  <Text style={styles.errorText}>{errors.farmer_name}</Text>
                )}
              </View>

              {/* Amount Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Amount ($) *</Text>
                <TextInput
                  style={[styles.input, errors.amount ? styles.inputError : undefined]}
                  placeholder="Enter investment amount"
                  placeholderTextColor="#999"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                  editable={!isSubmitting}
                  testID="amount-input"
                />
                {errors.amount && (
                  <Text style={styles.errorText}>{errors.amount}</Text>
                )}
              </View>

              {/* Crop Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Crop Type *</Text>
                <TextInput
                  style={[styles.input, errors.crop ? styles.inputError : undefined]}
                  placeholder="Enter crop type (e.g., Wheat, Corn)"
                  placeholderTextColor="#999"
                  value={crop}
                  onChangeText={setCrop}
                  editable={!isSubmitting}
                  testID="crop-input"
                  autoCapitalize="words"
                />
                {errors.crop && (
                  <Text style={styles.errorText}>{errors.crop}</Text>
                )}
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
              testID="submit-button"
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Create Investment</Text>
              )}
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              disabled={isSubmitting}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#F5F5DC', // Beige
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32', // Forest Green
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8D6E63', // Soil Brown
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFFFFF', // Soft White
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8D6E63', // Soil Brown
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#81C784', // Leaf Green
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFFFFF', // Soft White
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFEBEE',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: '#2E7D32', // Forest Green
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonDisabled: {
    backgroundColor: '#81C784', // Leaf Green
  },
  submitButtonText: {
    color: '#FFFFFF', // Soft White
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#8D6E63', // Soil Brown
  },
  cancelButtonText: {
    color: '#FFFFFF', // Soft White
    fontSize: 16,
  },
});

export default NewInvestmentModal;
