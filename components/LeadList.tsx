import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useLeads } from '../hooks/useLeads';
import LeadCard from './LeadCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LeadsParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<LeadsParamList, 'LeadList'>;

export default function LeadListScreen() {
    const navigation = useNavigation<NavigationProp>();

    const {
        data,
        isLoading,
        error,
    } = useLeads();

    const leads = data?.pages.flatMap(page => page.data) ?? [];

    if (isLoading) return <ActivityIndicator />;
    if (error) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
            <Text style={{ color: 'red', textAlign: 'center' }}>
                Error loading leads: {error instanceof Error ? error.message : 'Unknown error'}
            </Text>
        </View>
    );

    return (
        <FlatList
            data={leads}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <LeadCard key={item.id} lead={item} onPress={() => navigation.navigate('LeadDetail', { leadId: item.id })} />
            )}
        />
    );
}
