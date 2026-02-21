import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextInputField from '../../components/inputs/TextInputField';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { theme } from '../../theme';

export default function CreateGroupScreen() {
  const [groupName, setGroupName] = useState('');
  const [interest, setInterest] = useState('');
  return (
    <View style={styles.container}>
      <TextInputField label="Group Name" value={groupName} onChangeText={setGroupName} />
      <TextInputField label="Interest Rate %" value={interest} onChangeText={setInterest} keyboardType="numeric" />
      <PrimaryButton title="Create Group" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: theme.spacing.md } });
