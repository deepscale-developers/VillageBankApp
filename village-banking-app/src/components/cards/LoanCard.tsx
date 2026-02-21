import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type Props = { member: string; amount: string; rate?: string; progress?: number };

export default function LoanCard({ member, amount, rate = '0%', progress = 0 }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.member}>{member}</Text>
      <Text style={styles.amount}>{amount}</Text>
      <Text style={styles.rate}>{rate} • Repay {Math.round(progress * 100)}%</Text>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${Math.min(100, Math.round(progress * 100))}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.sm,
    borderRadius: 14,
    marginBottom: theme.spacing.sm,
  },
  member: { fontWeight: '700', color: theme.colors.text },
  amount: { fontSize: theme.typography.numeric, fontWeight: '800', color: theme.colors.primary },
  rate: { color: theme.colors.muted, marginVertical: 6 },
  progressBackground: { backgroundColor: '#eee', height: 8, borderRadius: 8, overflow: 'hidden' },
  progressFill: { backgroundColor: theme.colors.accent, height: 8 },
});
