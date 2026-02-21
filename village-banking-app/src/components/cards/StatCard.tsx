import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type Props = { title: string; value: string };

export default function StatCard({ title, value }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.sm,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  title: { color: theme.colors.muted, marginBottom: 8 },
  value: { color: theme.colors.text, fontSize: theme.typography.h2, fontWeight: '700' },
});
