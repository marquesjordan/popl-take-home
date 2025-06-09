import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LeadDetailCard from '../components/LeadDetailCard';
import { LeadsParamList, Lead } from '../types';
import { leadsApi } from '../api/leadsApi';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LeadDetailRouteProp = RouteProp<LeadsParamList, 'LeadDetail'>;
type NavigationProp = NativeStackNavigationProp<LeadsParamList, 'LeadList'>;

export default function LeadDetailScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { params: { leadId } } = useRoute<LeadDetailRouteProp>();

  const [leadDetail, setLeadDetail] = useState<Lead | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);


  useEffect(() => {
    const fetchLead = async () => {
      try {
        const data = await leadsApi.getById(leadId);
        setLeadDetail(data);
      } catch (e) {
        setLoadError('Lead was not found');
      }
    };
    fetchLead();
  }, [leadId]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {leadDetail && <LeadDetailCard lead={leadDetail} onPress={() => navigation.navigate('EditLead', { lead: leadDetail })} />}
    </View>
  );
}
