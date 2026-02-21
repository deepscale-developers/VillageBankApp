import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';

const CIRCLE_RADIUS = 30;
const DOT_RADIUS = 6;

export default function SplashScreen() {
  const navigation = useNavigation<any>();

  // Logo & tagline animation
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(20)).current;

  // Circle loader rotation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo fade-in
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Tagline slide-up & fade-in
    Animated.sequence([
      Animated.delay(800),
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(taglineTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Start loader rotation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        })
      ).start();
    });

    // Navigate after 4 seconds
    const timer = setTimeout(() => navigation.replace('Welcome'), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Interpolate rotation
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Dot position in circle
  const getDotStyle = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      position: 'absolute' as 'absolute',
      top: CIRCLE_RADIUS + CIRCLE_RADIUS * Math.sin(rad) - DOT_RADIUS,
      left: CIRCLE_RADIUS + CIRCLE_RADIUS * Math.cos(rad) - DOT_RADIUS,
    };
  };

  return (
    <LinearGradient
      colors={['#0C5A42', '#0C5A42']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Logo & Tagline */}
          <Animated.Text style={[styles.logo, { opacity: logoOpacity }]}>
            VillageBank
          </Animated.Text>
          <Animated.Text
            style={[
              styles.tag,
              { opacity: taglineOpacity, transform: [{ translateY: taglineTranslateY }] },
            ]}
          >
            Community Wealth, Together
          </Animated.Text>

          {/* Loader at bottom using absolute positioning */}
          <Animated.View style={[styles.circleContainer, { transform: [{ rotate }] }]}>
            <View style={[styles.dot, getDotStyle(0)]} />
            <View style={[styles.dot, getDotStyle(120)]} />
            <View style={[styles.dot, getDotStyle(240)]} />
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center', // Center logo & tagline
    alignItems: 'center',
  },

  logo: { fontSize: 40, fontWeight: '900', color: '#FFFFFF', letterSpacing: 1 },
  tag: { fontSize: 16, color: 'rgba(255,255,255,0.85)', marginTop: 8, textAlign: 'center' },

  circleContainer: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    position: 'absolute',
    bottom: 40, // distance from bottom
  },
  dot: {
    width: DOT_RADIUS * 1,
    height: DOT_RADIUS * 1,
    borderRadius: DOT_RADIUS,
    backgroundColor: '#FFFFFF',
  },
});
