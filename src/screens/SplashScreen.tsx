import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Platform,
  Easing,
} from 'react-native';

const serif = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const OUT = { easing: Easing.out(Easing.cubic), useNativeDriver: true };
const IN  = { easing: Easing.in(Easing.cubic),  useNativeDriver: true };

type Props = { onFinish: () => void };

export default function SplashScreenView({ onFinish }: Props) {
  const logoOpacity   = useRef(new Animated.Value(0)).current;
  const logoScale     = useRef(new Animated.Value(0.92)).current;
  const nameOpacity   = useRef(new Animated.Value(0)).current;
  const nameY         = useRef(new Animated.Value(8)).current;
  const tagOpacity    = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 520, ...OUT }),
        Animated.timing(logoScale,   { toValue: 1, duration: 520, ...OUT }),
      ]),
      Animated.delay(40),
      Animated.parallel([
        Animated.timing(nameOpacity, { toValue: 1, duration: 380, ...OUT }),
        Animated.timing(nameY,       { toValue: 0, duration: 380, ...OUT }),
      ]),
      Animated.delay(40),
      Animated.timing(tagOpacity, { toValue: 1, duration: 280, ...OUT }),
      Animated.delay(980),
      Animated.timing(screenOpacity, { toValue: 0, duration: 500, ...IN }),
    ]).start(() => onFinish());
  }, []);

  return (
    <Animated.View style={[styles.root, { opacity: screenOpacity }]}>
      <View style={styles.center}>
        {/* Bare monogram — no box, no border, just the glyph */}
        <Animated.Text
          style={[styles.monogram, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
        >
          M
        </Animated.Text>

        {/* Thin rule */}
        <Animated.View style={[styles.rule, { opacity: tagOpacity }]} />

        <Animated.Text
          style={[styles.name, { opacity: nameOpacity, transform: [{ translateY: nameY }] }]}
        >
          Maaz
        </Animated.Text>

        <Animated.Text style={[styles.tagline, { opacity: tagOpacity }]}>
          script
        </Animated.Text>
      </View>

      <Animated.Text style={[styles.version, { opacity: tagOpacity }]}>v 1.0</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  monogram: {
    fontSize: 104,
    fontWeight: '200',
    color: '#fff',
    fontFamily: serif,
    fontStyle: 'italic',
    letterSpacing: -4,
    includeFontPadding: false,
    marginBottom: 0,
    textShadowColor: 'rgba(99, 102, 241, 0.55)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 36,
  },
  rule: {
    width: 32,
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginVertical: 20,
  },
  name: {
    fontSize: 36,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 8,
    fontFamily: serif,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 10,
    fontWeight: '300',
    color: 'rgba(255,255,255,0.26)',
    letterSpacing: 10,
    fontFamily: serif,
  },
  version: {
    position: 'absolute',
    bottom: 52,
    fontSize: 10,
    color: 'rgba(255,255,255,0.12)',
    letterSpacing: 3,
    fontWeight: '300',
  },
});
