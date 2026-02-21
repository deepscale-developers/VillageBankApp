import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type Props = { role: 'Admin' | 'Cashier' | 'Member' };

export default function RoleBadge({ role }: Props) {
  const bg = role === 'Admin' ? theme.colors.primary : role === 'Cashier' ? theme.colors.accent : theme.colors.secondary;
  return (
    <View style={[styles.container, { backgroundColor: bg }]}> 
      <Text style={styles.text}>{role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
  },
});
