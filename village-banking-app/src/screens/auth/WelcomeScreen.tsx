import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { theme } from '../../theme';

export default function WelcomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <LinearGradient
       colors={['#FFFFFF', '#0C5A42']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          
          {/* Top Section */}
          <View style={styles.topSection}>
            {/* Replace with your illustration */}
            <Image
              source={require('../../assets/illustrations/community.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.title}>VillageBank</Text>
            <Text style={styles.subtitle}>
              Community Wealth, Together
            </Text>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <PrimaryButton
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />

            <SecondaryButton
              title="Create Account"
              onPress={() => navigation.navigate('Register')}
              style={{ marginTop: theme.spacing.md }}
            />

            <Text style={styles.footerText}>
              Secure • Transparent • Community Driven
            </Text>

            <Text style={styles.footerText}>
              Powered by DeepScale Technologies
            </Text>
          </View>

        </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  topSection: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  image: {
    width: 340,
    height: 340,
  },
  title: {
    fontSize: theme.typography.h1,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: theme.typography.body,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  bottomSection: {
    marginBottom: 30,
  },
  footerText: {
    marginTop: theme.spacing.lg,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
});
