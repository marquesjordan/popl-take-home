import React from 'react';
import { View } from 'react-native';
import { TextInput, HelperText, Text } from 'react-native-paper';
import { LeadForm } from '../types';

type FormErrors = {
    name?: string;
    email?: string;
    phone?: string;
    form?: string;
};

type Props = {
    lead: Partial<LeadForm>;
    errors: FormErrors;
    onChange: (field: keyof LeadForm, value: string) => void;
    submitError?: string | null;
    isSubmitting?: boolean;
    heading?: string;
};

export const LeadFormComponent: React.FC<Props> = ({
    lead,
    errors,
    onChange,
    submitError,
    isSubmitting,
    heading = "Lead Form",
}) => {
    return (
        <View style={{ padding: 16, gap: 8 }}>
            <Text variant="headlineMedium" style={{ marginBottom: 16, textAlign: 'center' }}>
                {heading}
            </Text>

            {errors.form && (
                <HelperText type="error" visible={!!errors.form}>
                    {errors.form}
                </HelperText>
            )}
            {submitError && (
                <HelperText type="error" visible={!!submitError}>
                    {submitError}
                </HelperText>
            )}

            <TextInput
                label="Name"
                mode="outlined"
                value={lead.name}
                onChangeText={(text) => onChange('name', text)}
                error={!!errors.name}
                disabled={isSubmitting}
            />
            {errors.name && <HelperText type="error">{errors.name}</HelperText>}

            <TextInput
                label="Email"
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                value={lead.email}
                onChangeText={(text) => onChange('email', text)}
                error={!!errors.email}
                disabled={isSubmitting}
            />
            {errors.email && <HelperText type="error">{errors.email}</HelperText>}

            <TextInput
                label="Company"
                mode="outlined"
                value={lead.company}
                onChangeText={(text) => onChange('company', text)}
                disabled={isSubmitting}
            />

            <TextInput
                label="Title"
                mode="outlined"
                value={lead.title}
                onChangeText={(text) => onChange('title', text)}
                disabled={isSubmitting}
            />

            <TextInput
                label="Phone (9 digits)"
                mode="outlined"
                keyboardType="phone-pad"
                maxLength={9}
                value={lead.phone}
                onChangeText={(text) => onChange('phone', text.replace(/\D/g, ''))}
                error={!!errors.phone}
                disabled={isSubmitting}
            />
            {errors.phone && <HelperText type="error">{errors.phone}</HelperText>}

            <TextInput
                label="Tags (comma-separated)"
                mode="outlined"
                value={lead.tags}
                onChangeText={(text) => onChange('tags', text)}
                disabled={isSubmitting}
            />

            <TextInput
                label="Notes"
                mode="outlined"
                multiline
                numberOfLines={4}
                value={lead.notes}
                onChangeText={(text) => onChange('notes', text)}
                disabled={isSubmitting}
            />
        </View>
    );
};
