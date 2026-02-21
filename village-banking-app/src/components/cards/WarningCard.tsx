import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type Props = { title: string; message?: string };

export default function WarningCard({ title, message }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: theme.colors.danger, padding: 12, borderRadius: 12 },
  title: { color: '#fff', fontWeight: '800' },
  message: { color: '#fff', marginTop: 6 },
});
