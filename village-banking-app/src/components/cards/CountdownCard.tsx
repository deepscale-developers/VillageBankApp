import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type Props = { title?: string; days?: number };

export default function CountdownCard({ title = 'Share-out', days = 12 }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.days}>{days} days</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: theme.colors.card, padding: theme.spacing.sm, borderRadius: 12 },
  title: { color: theme.colors.muted },
  days: { fontSize: theme.typography.h2, fontWeight: '800', color: theme.colors.primary },
});
