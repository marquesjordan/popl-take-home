import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, TextInput, HelperText, Text } from 'react-native-paper';

type LeadFormData = {
  name: string;
  email: string;
  company: string;
  title: string;
  phone: string;
  tags: string;
  notes: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  form?: string;
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length === 9;
};

export default function NewLeadScreen() {
  const [lead, setLead] = useState<LeadFormData>({
    name: '',
    email: '',
    company: '',
    title: '',
    phone: '',
    tags: '',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const clearFieldError = (field: keyof FormErrors) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      // Clear form error if either email or phone is filled
      if ((field === 'email' && lead.phone.trim()) || (field === 'phone' && lead.email.trim())) {
        delete newErrors.form;
      }
      return newErrors;
    });
  };

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setLead(prev => ({ ...prev, [field]: value }));
    clearFieldError(field as keyof FormErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!lead.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (lead.email.trim()) {
      if (!isValidEmail(lead.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (lead.phone.trim()) {
      if (!isValidPhone(lead.phone.trim())) {
        newErrors.phone = 'Phone number must be 9 digits';
      }
    }

    // Check if either email or phone is provided
    if (!lead.email.trim() && !lead.phone.trim()) {
      newErrors.form = 'Either email or phone number is required';
      if (!lead.email.trim()) newErrors.email = 'Email is required if no phone number is provided';
      if (!lead.phone.trim()) newErrors.phone = 'Phone number is required if no email is provided';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const newLead = {
      ...lead,
      tags: lead.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text variant="headlineMedium" style={styles.heading}>Create a New Lead</Text>
          {errors.form && (
            <HelperText type="error" visible={!!errors.form} style={styles.formError}>
              {errors.form}
            </HelperText>
          )}
          <TextInput
            testID="name-input"
            label="Name"
            mode="outlined"
            value={lead.name}
            onChangeText={(text) => handleChange('name', text)}
            error={!!errors.name}
          />
          {errors.name && <HelperText type="error" visible={!!errors.name}>
            {errors.name}
          </HelperText>}
          <TextInput
            testID="email-input"
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={lead.email}
            onChangeText={(text) => handleChange('email', text)}
            error={!!errors.email}
          />
          {errors.email && <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>}
          <TextInput
            testID="company-input"
            label="Company"
            mode="outlined"
            value={lead.company}
            onChangeText={(text) => handleChange('company', text)}
          />
          <TextInput
            testID="title-input"
            label="Title"
            mode="outlined"
            value={lead.title}
            onChangeText={(text) => handleChange('title', text)}
          />
          <TextInput
            testID="phone-input"
            label="Phone (9 digits)"
            mode="outlined"
            keyboardType="phone-pad"
            maxLength={9}
            value={lead.phone}
            onChangeText={(text) => handleChange('phone', text.replace(/\D/g, ''))}
            error={!!errors.phone}
          />
          {errors.phone && <HelperText type="error" visible={!!errors.phone}>
            {errors.phone}
          </HelperText>}
          <TextInput
            testID="tags-input"
            label="Tags (comma-separated)"
            mode="outlined"
            value={lead.tags}
            onChangeText={(text) => handleChange('tags', text)}
          />
          <TextInput
            testID="notes-input"
            label="Notes"
            mode="outlined"
            multiline
            numberOfLines={4}
            value={lead.notes}
            onChangeText={(text) => handleChange('notes', text)}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button testID="save-button" mode="contained" onPress={handleSave} style={styles.button}>
          Save
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 16,
    gap: 8,
  },
  heading: {
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    width: '100%',
  },
  formError: {
    marginHorizontal: 16,
    marginTop: 16,
  },
});
