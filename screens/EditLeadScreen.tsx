// screens/EditLeadScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { LeadFormComponent } from '../components/LeadForm';
import { Lead, LeadForm } from '../types';
import { leadsApi } from '../api/leadsApi';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useLeadForm } from '../hooks/useLeadForm';

type ParamList = { EditLead: { id: string } };

export default function EditLeadScreen() {
    const { params } = useRoute<RouteProp<ParamList, 'EditLead'>>();
    const [initialLead, setInitialLead] = useState<Partial<LeadForm>>();
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const result = await leadsApi.getById(params.id);
                setInitialLead({
                    ...result.data,
                    email: result.data.email || '',
                    company: result.data.company || '',
                    title: result.data.title || '',
                    phone: result.data.phone || '',
                    notes: result.data.notes || '',
                    tags: result.data.tags?.join(', ') || ''
                });
            } catch (e) {
                setLoadError('Lead was not found');
            }
        };
        fetchLead();
    }, [params.id]);

    const {
        lead,
        errors,
        isSubmitting,
        submitError,
        handleChange,
        handleSubmit,
    } = useLeadForm({
        initialLead,
        onSubmit: async (updatedLead) => {
            await leadsApi.update(params.id, updatedLead);
        },
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <LeadFormComponent
                    lead={lead}
                    errors={errors}
                    onChange={handleChange}
                    submitError={loadError || submitError}
                    isSubmitting={isSubmitting}
                    heading="Edit Lead"
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
