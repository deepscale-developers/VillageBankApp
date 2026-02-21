import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import AdminStack from './AdminStack';
import CashierStack from './CashierStack';
import MemberStack from './MemberStack';

export default function AppNavigator() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('currentUser');
      if (storedUser) setUser(JSON.parse(storedUser));
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#004527" />
      </View>
    );
  }

  // Render single NavigationContainer with conditional stacks
  return (
    <NavigationContainer>
      {user ? (
        user.role === 'admin' ? (
          <AdminStack />
        ) : user.role === 'cashier' ? (
          <CashierStack />
        ) : (
          <MemberStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
