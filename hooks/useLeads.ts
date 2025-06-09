import { useInfiniteQuery } from '@tanstack/react-query';
import { leadsApi } from '../api/leadsApi';

export function useLeads() {
    return useInfiniteQuery({
        queryKey: ['leads'],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            try {
                const data = await leadsApi.getAll();
                console.log('Fetched leads:', data);
                return {
                    data,
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
