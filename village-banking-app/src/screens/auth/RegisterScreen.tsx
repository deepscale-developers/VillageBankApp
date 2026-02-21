import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TextInputField from '../../components/inputs/TextInputField';
import PasswordInput from '../../components/inputs/PasswordInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { theme } from '../../theme';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'cashier' | 'member' | null>(null);

  const handleRegister = () => {
    // TODO: implement registration logic
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#ffffff']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Branding Section */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>VB</Text>
              </View>
              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>
                Join your community savings group
              </Text>
            </View>

            {/* Input Fields */}
            <View style={styles.form}>
              <View style={{ marginBottom: theme.spacing.md }}>
                <TextInputField
                  label="Full Name"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={{ marginBottom: theme.spacing.md }}>
                <TextInputField
                  label="Phone"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={{ marginBottom: theme.spacing.md }}>
                <TextInputField
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>

              <View style={{ marginBottom: theme.spacing.md }}>
                <PasswordInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {/* Role Selection */}
              <Text style={styles.roleLabel}>Select Your Role</Text>
              <View style={styles.roleContainer}>
                {['admin', 'cashier', 'member'].map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[
                      styles.roleCard,
                      role === r && styles.roleCardSelected,
                    ]}
                    onPress={() => setRole(r as any)}
                  >
                    <Text
                      style={[
                        styles.roleText,
                        role === r && styles.roleTextSelected,
                      ]}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Create Account Button */}
              <PrimaryButton
                title="Create Account"
                onPress={handleRegister}
                style={{ marginTop: theme.spacing.lg }}
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

  // Branding
  logoContainer: { alignItems: 'center', marginBottom: theme.spacing.lg },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  logoText: { fontSize: 32, fontWeight: '800', color: '#000000' },
  title: { fontSize: 30, fontWeight: '700', color: '#000000' },
  subtitle: {
    fontSize: theme.typography.body,
    color: 'rgba(0, 0, 0, 0.85)',
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },

  // Form
  form: { marginTop: theme.spacing.lg },
  roleLabel: {
    color: '#FFF',
    fontSize: theme.typography.body,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.md },
  roleCard: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    paddingVertical: theme.spacing.md,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  roleCardSelected: {
    backgroundColor: '#004527',
  },
  roleText: { color: '#FFF', fontWeight: '600' },
  roleTextSelected: { color: '#FFFFFF' },
});
