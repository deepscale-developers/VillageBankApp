import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type Props = {
  label?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  keyboardType?: any;
};

export default function TextInputField({ label, value, onChangeText, placeholder, keyboardType }: Props) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: theme.spacing.sm },
  label: { color: theme.colors.text, marginBottom: 6, fontWeight: '600' },
  input: {
    backgroundColor: theme.colors.card,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
});
