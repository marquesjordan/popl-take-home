import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import LeadList, { LeadListRef } from '../components/LeadList';
import { LeadsParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<LeadsParamList>;

export default function LeadListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const leadListRef = useRef<LeadListRef>(null);

  return (
    <View style={{ flex: 1 }}>
      <LeadList ref={leadListRef} />

      <FAB
        icon="plus"
        onPress={() => {
          (navigation.navigate as any)('NewLead', {
            onLeadCreated: () => {
              leadListRef.current?.refetch();
            }
          });
        }}
        style={{ position: 'absolute', right: 24, bottom: 40 }}
      />
    </View>
  );
}
