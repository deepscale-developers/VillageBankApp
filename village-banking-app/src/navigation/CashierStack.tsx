import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CashierDashboardScreen from '../screens/cashier/CashierDashboardScreen';

const Stack = createNativeStackNavigator();

export default function CashierStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CashierDashboard" component={CashierDashboardScreen} />
      {/* Add other cashier screens here */}
    </Stack.Navigator>
  );
}
