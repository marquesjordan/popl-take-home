import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';
import { Lead } from '../types';

interface LeadCardProps {
    lead: Lead;
    onPress: (lead: Lead) => void;
}

const LeadCard = ({ lead, onPress }: LeadCardProps) => {
    const titleAndCompany =
        lead.title?.trim() && lead.company?.trim()
            ? `${lead.title.trim()} at ${lead.company.trim()}`
            : lead.title?.trim()
                ? lead.title.trim()
                : lead.company?.trim()
                    ? lead.company.trim()
                    : '';

    return (
        <TouchableOpacity onPress={() => onPress(lead)}>
            <Card style={{ margin: 8 }}>
                <Card.Title
                    titleStyle={{ fontWeight: 'bold' }}
                    title={lead.name.trim()}
                    subtitle={titleAndCompany}
                    left={() => <Avatar.Icon size={40} icon="account" />}
                />
            </Card>
        </TouchableOpacity>
    );
};

export default LeadCard;