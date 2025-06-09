import { useInfiniteQuery } from '@tanstack/react-query';
import { leadsApi } from '../api/leadsApi';
import { useMemo } from 'react';

interface UseLeadsOptions {
    searchQuery?: string;
    selectedTags?: string[];
}

export function useLeads({ searchQuery = '', selectedTags = [] }: UseLeadsOptions = {}) {
    const queryKey = useMemo(() => ['leads', searchQuery, selectedTags], [searchQuery, selectedTags]);

    return useInfiniteQuery({
        queryKey,
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            try {
                const data = await leadsApi.getAll();

                const filteredData = data.filter(lead => {
                    const matchesSearch = searchQuery === '' ||
                        lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        lead.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        lead.phone?.toLowerCase().includes(searchQuery.toLowerCase());

                    const matchesTags = selectedTags.length === 0 ||
                        selectedTags.every(tag => lead.tags.includes(tag));

                    return matchesSearch && matchesTags;
                });

                return {
                    data: filteredData,
                    nextPage: pageParam + 1,
                    hasMore: false,
                };
            } catch (error) {
                console.error('Error fetching leads:', error);
                throw error;
            }
        },
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    });
}
