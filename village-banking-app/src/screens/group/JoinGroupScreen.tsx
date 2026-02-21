import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CodeInput from '../../components/inputs/CodeInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { theme } from '../../theme';

export default function JoinGroupScreen() {
  const [code, setCode] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Group Join Code</Text>
      <CodeInput value={code} onChangeText={setCode} placeholder="123456" />
      <PrimaryButton title="Join Group" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: theme.spacing.md }, title: { fontWeight: '700', marginBottom: theme.spacing.sm } });
