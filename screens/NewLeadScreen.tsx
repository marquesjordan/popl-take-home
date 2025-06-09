import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { Button } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import { leadsApi } from '../api/leadsApi';
import { LeadFormComponent } from '../components/LeadForm';
import { useLeadForm } from '../hooks/useLeadForm';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { LeadsParamList } from '../types';

type NewLeadScreenRouteProp = RouteProp<LeadsParamList, 'NewLead'>;

export default function NewLeadScreen() {
  const navigation = useNavigation();
  const route = useRoute<NewLeadScreenRouteProp>();
  const {
    lead,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
  } = useLeadForm({
    onSubmit: async (newLead) => {
      await leadsApi.create({
        ...newLead,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      });
      route.params?.onLeadCreated?.();
      navigation.goBack();
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <LeadFormComponent
          lead={lead}
          errors={errors}
          onChange={handleChange}
          submitError={submitError}
          isSubmitting={isSubmitting}
          heading="Create a New Lead"
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          testID="save-button"
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
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
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    width: '100%',
  },
});
