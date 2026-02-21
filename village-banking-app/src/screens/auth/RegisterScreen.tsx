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

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'cashier' | 'member' | null>(null);

  const handleRegister = async () => {
    if (!name || !email || !password || !role) {
      alert('Please fill all fields and select a role');
      return;
    }

    const user = { name, phone, email, password, role };

    // Save the user locally
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));

    // AppNavigator will detect the stored user and show the correct stack automatically
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
            {/* Branding */}
            <View style={styles.logoContainer}>
              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>Join your community savings group</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <TextInputField
                label="Full Name"
                value={name}
                onChangeText={setName}
                placeholder="Jane Doe"
                style={{ marginBottom: theme.spacing.md }}
              />

              <TextInputField
                label="Phone"
                value={phone}
                onChangeText={setPhone}
                placeholder="+260"
                keyboardType="phone-pad"
                style={{ marginBottom: theme.spacing.md }}
              />

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

              {/* Role selection */}
              <Text style={styles.roleLabel}>Select Your Role</Text>
              <View style={styles.roleContainer}>
                {['admin', 'cashier', 'member'].map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.roleCard, role === r && styles.roleCardSelected]}
                    onPress={() => setRole(r as any)}
                  >
                    <Text style={[styles.roleText, role === r && styles.roleTextSelected]}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <PrimaryButton
                title="Create Account"
                onPress={handleRegister}
                style={{ marginTop: 30 }}
              />
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
  container: { flex: 1, paddingHorizontal: theme.spacing.md },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },

  logoContainer: { alignItems: 'center', marginTop: 100, marginBottom: 30 },
  title: { fontSize: 30, fontWeight: '700', color: '#000' },
  subtitle: { fontSize: theme.typography.body, color: '#555', textAlign: 'center', marginTop: theme.spacing.sm },

  form: { marginTop: theme.spacing.lg },
  roleLabel: { color: '#000', fontSize: theme.typography.body, fontWeight: '600', marginBottom: theme.spacing.sm },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.md },
  roleCard: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: theme.spacing.md,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  roleCardSelected: { backgroundColor: '#004527' },
  roleText: { color: '#000', fontWeight: '600' },
  roleTextSelected: { color: '#fff' },
});
