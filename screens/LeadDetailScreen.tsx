import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LeadDetailCard from '../components/LeadDetailCard';
import { LeadsParamList, Lead } from '../types';
import { leadsApi } from '../api/leadsApi';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LeadDetailSkeleton from '../components/LeadDetailSkeleton';

type LeadDetailRouteProp = RouteProp<LeadsParamList, 'LeadDetail'>;
type NavigationProp = NativeStackNavigationProp<LeadsParamList, 'LeadList'>;

export default function LeadDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const { params: { leadId } } = useRoute<LeadDetailRouteProp>();

  const [leadDetail, setLeadDetail] = useState<Lead | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
    }
    const fetchLead = async () => {
      try {
        const data = await leadsApi.getById(leadId);
        setLeadDetail(data);
      } catch (e) {
        setLoadError('Lead was not found');
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchLead();
  }, [leadId, isFocused]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {isLoading ? <LeadDetailSkeleton /> : leadDetail && <LeadDetailCard lead={leadDetail} onPress={() => navigation.navigate('EditLead', { lead: leadDetail })} />}
    </View>
  );
}
