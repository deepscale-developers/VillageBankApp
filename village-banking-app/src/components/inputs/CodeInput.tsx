import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type Props = { value?: string; onChangeText?: (t: string) => void; placeholder?: string };

export default function CodeInput({ value, onChangeText, placeholder }: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType="numeric"
      style={styles.input}
      maxLength={6}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.card,
    padding: 16,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
});
