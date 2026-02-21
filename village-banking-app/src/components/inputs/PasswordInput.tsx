import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

type Props = { label?: string; value?: string; onChangeText?: (t: string) => void };

export default function PasswordInput({ label, value, onChangeText }: Props) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          secureTextEntry={!visible}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={() => setVisible((v) => !v)} style={styles.toggle}>
          <Text style={{ color: theme.colors.primary }}>{visible ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: theme.spacing.sm },
  label: { color: theme.colors.text, marginBottom: 6, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    backgroundColor: theme.colors.card,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  toggle: { marginLeft: 8 },
});
