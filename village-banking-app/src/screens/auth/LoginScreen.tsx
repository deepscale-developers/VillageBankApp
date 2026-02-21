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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Add login logic
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to ForgotPasswordScreen
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
            {/* Branding / Logo */}
            <View style={styles.logoContainer}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Login to manage your savings and loans
              </Text>
            </View>

            {/* Input Fields */}
            <View style={styles.form}>
              <View style={{ marginBottom: theme.spacing.md }}>
                <TextInputField
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  keyboardType="email-address"
                />
              </View>

              <View style={{ marginBottom: theme.spacing.sm }}>
                <PasswordInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {/* Forgot Password */}
              <TouchableOpacity
                onPress={handleForgotPassword}
                style={{ alignSelf: 'flex-end', marginBottom: theme.spacing.md }}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <PrimaryButton title="Login" onPress={handleLogin} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  
  title: {
    fontSize: theme.typography.h1,
    fontWeight: '700',
    color: '#000000',
  },
  subtitle: {
    fontSize: theme.typography.body,
    color: 'rgba(0, 0, 0, 0.85)',
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },
  form: {
    marginTop: theme.spacing.lg,
  },
  forgotPasswordText: {
    fontSize: theme.typography.body,
    color: '#000000',
    fontWeight: '600',
  },
});
