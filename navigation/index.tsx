import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LeadListScreen from '../screens/LeadListScreen';
import LeadDetailScreen from '../screens/LeadDetailScreen';
import NewLeadScreen from '../screens/NewLeadScreen';
import EditLeadScreen from '../screens/EditLeadScreen';
import { LeadsParamList } from '../types';

const Stack = createNativeStackNavigator<LeadsParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LeadList">
        <Stack.Screen
          name="LeadList"
          component={LeadListScreen}
          options={{ title: 'Leads' }}
        />
        <Stack.Screen
          name="LeadDetail"
          component={LeadDetailScreen}
          options={{ title: 'Lead Details' }}
        />

        <Stack.Screen
          name="NewLead"
          component={NewLeadScreen}
          options={{ title: 'New Lead', presentation: 'modal' }}
        />
        <Stack.Screen
          name="EditLead"
          component={EditLeadScreen}
          options={{ title: 'Edit Lead', presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
