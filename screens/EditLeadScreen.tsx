// screens/EditLeadScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { LeadFormComponent } from '../components/LeadForm';
import { Lead, LeadsParamList } from '../types';
import { leadsApi } from '../api/leadsApi';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLeadForm } from '../hooks/useLeadForm';

type EditDetailRouteProp = RouteProp<LeadsParamList, 'EditLead'>;
type NavigationProp = NativeStackNavigationProp<LeadsParamList>;

export default function EditLeadScreen() {
    const { params: { lead } } = useRoute<EditDetailRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const {
        lead: updatedLead,
        errors,
        isSubmitting,
        submitError,
        handleChange,
        handleSubmit,
    } = useLeadForm({
        initialLead: {
            name: lead.name || '',
            email: lead.email || '',
            company: lead.company || '',
            title: lead.title || '',
            phone: lead.phone || '',
            notes: lead.notes || '',
            tags: lead.tags?.join(', ') || ''
        },
        onSubmit: async (updatedLead) => {
            await leadsApi.update(lead.id, updatedLead);
            navigation.goBack();
        },
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <LeadFormComponent
                    lead={{
                        name: updatedLead.name || '',
                        email: updatedLead.email || '',
                        company: updatedLead.company || '',
                        title: updatedLead.title || '',
                        phone: updatedLead.phone || '',
                        notes: updatedLead.notes || '',
                        tags: updatedLead.tags || ''
                    }}
                    errors={errors}
                    onChange={handleChange}
                    submitError={submitError}
                    isSubmitting={isSubmitting}
                    heading="Edit Lead Form"
                />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={handleSubmit} loading={isSubmitting} disabled={isSubmitting}>
                    Update
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { flexGrow: 1 },
    buttonContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: 'white',
    },
});
