import { useState } from 'react';
import { Lead, LeadForm } from '../types';
import { isValidEmail } from '../utils/validation';

type FormErrors = {
    name?: string;
    email?: string;
    phone?: string;
    form?: string;
};

interface UseLeadFormProps {
    initialLead?: Partial<LeadForm>;
    onSubmit: (lead: Lead) => Promise<void>;
}

export const useLeadForm = ({ initialLead, onSubmit }: UseLeadFormProps) => {
    const [lead, setLead] = useState<Partial<LeadForm>>(initialLead || {
        name: '',
        email: '',
        company: '',
        title: '',
        phone: '',
        tags: '',
        notes: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const clearFieldError = (field: keyof FormErrors) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            if ((field === 'email' && lead.phone?.trim()) || (field === 'phone' && lead.email?.trim())) {
                delete newErrors.form;
            }
            return newErrors;
        });
    };

    const handleChange = (field: keyof LeadForm, value: string) => {
        setLead(prev => ({ ...prev, [field]: value }));
        clearFieldError(field as keyof FormErrors);
        setSubmitError(null);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!lead.name?.trim()) {
            newErrors.name = 'Name is required';
        }

        if (lead.email?.trim()) {
            if (!isValidEmail(lead.email.trim())) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        if (!lead.email?.trim() && !lead.phone?.trim()) {
            newErrors.form = 'Either email or phone number is required';
            if (!lead.email?.trim()) newErrors.email = 'Email is required if no phone number is provided';
            if (!lead.phone?.trim()) newErrors.phone = 'Phone number is required if no email is provided';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const newLead = {
                ...lead,
                tags: lead.tags?.split(',').map(tag => tag.trim()).filter(Boolean) || [],
            };
            console.log('newLead', newLead);
            await onSubmit(newLead as Lead);

            if (!initialLead) {
                setLead({
                    name: '',
                    email: '',
                    company: '',
                    title: '',
                    phone: '',
                    tags: '',
                    notes: '',
                });
            }
        } catch (error) {
            setSubmitError('Failed to save lead. Please try again.');
            console.error('Error saving lead:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        lead,
        errors,
        isSubmitting,
        submitError,
        handleChange,
        handleSubmit,
    };
}; 