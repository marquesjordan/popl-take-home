import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useLeads } from '../hooks/useLeads';
import LeadCard from './LeadCard';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LeadsParamList, Lead } from '../types';
import LeadSearchAndFilter from './LeadSearchAndFilter';
import ListSkeleton from './ListSkeleton';

type NavigationProp = NativeStackNavigationProp<LeadsParamList, 'LeadList'>;

export interface LeadListRef {
    refetch: () => void;
}

const LeadListScreen = forwardRef<LeadListRef>((_, ref) => {
    const navigation = useNavigation<NavigationProp>();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const {
        data,
        isLoading,
        error,
        refetch
    } = useLeads({
        searchQuery,
        selectedTags,
    });

    useImperativeHandle(ref, () => ({
        refetch: () => {
            setSearchQuery('');
            setSelectedTags([]);
            refetch();
        }
    }));

    useFocusEffect(
        React.useCallback(() => {
            setSearchQuery('');
            setSelectedTags([]);
        }, [])
    );

    const leads = data?.pages.flatMap(page => page.data) ?? [];

    if (error) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
            <Text style={{ color: 'red', textAlign: 'center' }}>
                Error loading leads: {error instanceof Error ? error.message : 'Unknown error'}
            </Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <LeadSearchAndFilter
                leads={leads}
                onSearchChange={setSearchQuery}
                onTagsChange={setSelectedTags}
                selectedTags={selectedTags}
            />
            {isLoading ? <ListSkeleton /> : <FlatList
                data={leads}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <LeadCard key={item.id} lead={item} onPress={() => navigation.navigate('LeadDetail', { leadId: item.id })} />
                )}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 16 }}>No leads found</Text>}
            />}
        </View>
    );
});

export default LeadListScreen;
