import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MemberDashboardScreen from '../screens/member/MemberDashboardScreen';

const Stack = createNativeStackNavigator();

export default function MemberStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MemberDashboard" component={MemberDashboardScreen} />
      {/* Add other member screens here */}
    </Stack.Navigator>
  );
}
