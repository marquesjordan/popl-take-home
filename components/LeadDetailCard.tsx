// screens/LeadDetailScreen.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Chip, Text } from 'react-native-paper';
import { Lead } from '../types';
import { useNavigation } from '@react-navigation/native';


const LeadDetailScreen = ({ lead, onPress }: { lead: Lead, onPress: () => void }) => {
    return (
        <ScrollView style={{ padding: 16 }}>
            <Card>
                <Card.Title title={lead.name} subtitle={`${lead.title} at ${lead.company}`} />
                <Card.Content>
                    <Text style={{ marginTop: 8 }}>Email: {lead.email}</Text>
                    <Text>Phone: {lead.phone}</Text>
                    <Text style={{ marginTop: 8 }}>Notes:</Text>
                    <Text>{lead.notes}</Text>
                    <Text style={{ marginTop: 8 }}>Created At: {new Date(lead.createdAt).toLocaleString()}</Text>

                    <View style={{ marginTop: 12 }}>
                        <Text>Tags:</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                            {lead.tags.map(tag => (
                                <Chip key={tag} style={{ margin: 4 }}>{tag}</Chip>
                            ))}
                        </View>
                    </View>
                </Card.Content>
            </Card>

            <Button
                mode="contained"
                style={{ marginTop: 24 }}
                onPress={onPress}
            >
                Edit Lead
            </Button>
        </ScrollView>
    );
};

export default LeadDetailScreen;
