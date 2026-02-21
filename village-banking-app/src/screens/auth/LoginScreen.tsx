import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TextInputField from '../../components/inputs/TextInputField';
import PasswordInput from '../../components/inputs/PasswordInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { theme } from '../../theme';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const storedUser = await AsyncStorage.getItem('currentUser');
    if (!storedUser) return alert('No registered user found. Please register first.');

    const user = JSON.parse(storedUser);
    if (user.email !== email || user.password !== password) {
      return alert('Invalid email or password');
    }

    // Save current user
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));

    // AppNavigator will detect the stored user and render correct stack automatically
  };

  return (
    <LinearGradient colors={['#FFFFFF', '#ffffff']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.logoContainer}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Login to manage your savings and loans</Text>
            </View>

            <View style={styles.form}>
              <TextInputField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                style={{ marginBottom: theme.spacing.md }}
              />

              <PasswordInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                style={{ marginBottom: theme.spacing.md }}
              />

              <PrimaryButton title="Login" onPress={handleLogin} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.lg },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },

  logoContainer: { alignItems: 'center', marginBottom: theme.spacing.lg },
  title: { fontSize: theme.typography.h1, fontWeight: '700', color: '#000' },
  subtitle: { fontSize: theme.typography.body, color: '#555', textAlign: 'center', marginTop: theme.spacing.sm },

  form: { marginTop: theme.spacing.lg },
});
