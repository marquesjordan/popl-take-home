import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import LeadList from '../components/LeadList';
import { LeadsParamList } from '../types';

type Props = NativeStackScreenProps<LeadsParamList, 'LeadList'>;

export default function LeadListScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <LeadList />

      <FAB
        icon="plus"
        onPress={() => navigation.navigate('NewLead')}
        style={{ position: 'absolute', right: 24, bottom: 40 }}
      />
    </View>
  );
}
